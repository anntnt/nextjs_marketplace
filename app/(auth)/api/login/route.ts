import crypto from 'node:crypto';
import bcrypt from 'bcrypt';
import { cookies } from 'next/headers';
import type { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/cookies';
import { NextResponse } from 'next/server';
import { createSessionInsecure } from '../../../../database/sessions';
import { createOrUpdateCartItem } from '../../../../database/cartProducts';
import { getUserWithPasswordHashInsecure } from '../../../../database/users';
import {
  type UserLogin,
  userLoginSchema,
} from '../../../../migrations/0001-createTableUsers';
import { secureCookieOptions } from '../../../../util/cookies';
import { parseGuestCartCookie } from '../../../../util/guestCart';

export type LoginResponseBody =
  | {
      user: { username: UserLogin['username']; roleId: number };
    }
  | {
      errors: { message: string }[];
    };

export async function POST(
  request: Request,
): Promise<NextResponse<LoginResponseBody>> {
  // Task: Implement the user login workflow

  // 1. Get the user data from the request
  const requestBody = await request.json();

  // 2. Validate the user data with zod
  const result = userLoginSchema.safeParse(requestBody);

  if (!result.success) {
    return NextResponse.json(
      { errors: result.error.issues },
      {
        status: 400,
      },
    );
  }

  // 3. verify the user credentials
  const userWithPasswordHash = await getUserWithPasswordHashInsecure(
    result.data.username,
  );

  if (!userWithPasswordHash) {
    return NextResponse.json(
      {
        errors: [
          {
            message: 'Username or Password is invalid',
          },
        ],
      },
      {
        status: 400,
      },
    );
  }

  // 4. Validate the user password by comparing with hashed password
  const isPasswordValid = await bcrypt.compare(
    result.data.password,
    userWithPasswordHash.passwordHash,
  );

  if (!isPasswordValid) {
    return NextResponse.json(
      {
        errors: [
          {
            message: 'Username or Password is invalid',
          },
        ],
      },
      {
        status: 400,
      },
    );
  }

  // At this stage we already confirm that the user is who they say they are
  // 5. Create a token
  const token = crypto.randomBytes(100).toString('base64');

  // 6. Create the session record
  const session = await createSessionInsecure(userWithPasswordHash.id, token);

  if (!session) {
    return NextResponse.json(
      {
        errors: [
          {
            message: 'Problem creating session',
          },
        ],
      },
      {
        status: 400,
      },
    );
  }

  const requestCookies: ReadonlyRequestCookies = await cookies();
  const guestCartCookie = requestCookies.get('guestCart');
  const guestCartCookieValue = typeof guestCartCookie?.value === 'string'
    ? guestCartCookie.value
    : undefined;
  const guestCartItems = parseGuestCartCookie(guestCartCookieValue);

  const response = NextResponse.json({
    user: {
      username: userWithPasswordHash.username,
      roleId: userWithPasswordHash.roleId,
    },
  });

  response.cookies.set({
    name: 'sessionToken',
    value: session.token,
    ...secureCookieOptions,
  });

  if (guestCartItems.length > 0) {
    for (const item of guestCartItems) {
      await createOrUpdateCartItem(session.token, item.productId, item.quantity);
    }

    response.cookies.set({
      name: 'guestCart',
      value: '',
      path: '/',
      maxAge: 0,
    });
  }

  // 7. Return the new user information without the password hash

  return response;
}
