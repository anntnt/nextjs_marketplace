import crypto from 'node:crypto';
import bcrypt from 'bcrypt';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { createSessionInsecure } from '../../../../database/sessions';
import {
  createUserInsecure,
  getUserInsecure,
} from '../../../../database/users';
import { createOrUpdateCartItem } from '../../../../database/cartProducts';
import {
  type UserLogin,
  userSchema,
} from '../../../../migrations/0001-createTableUsers';
import { secureCookieOptions } from '../../../../util/cookies';
import { parseGuestCartCookie } from '../../../../util/guestCart';

export type RegisterResponseBody =
  | {
      user: { username: UserLogin['username']; roleId: number };
    }
  | {
      errors: { message: string }[];
    };

export async function POST(
  request: Request,
): Promise<NextResponse<RegisterResponseBody>> {
  // Task: Implement the user registration workflow

  // 1. Get the user data from the request
  const requestBody = await request.json();

  // 2. Validate the user data with zod
  const result = userSchema.safeParse(requestBody);

  if (!result.success) {
    return NextResponse.json(
      { errors: result.error.issues },
      {
        status: 400,
      },
    );
  }

  // 3. Check if user already exist in the database
  const user = await getUserInsecure(result.data.username);

  if (user) {
    return NextResponse.json(
      {
        errors: [
          {
            message: 'Username already taken',
          },
        ],
      },
      {
        status: 400,
      },
    );
  }

  // This is where you do confirm password

  // 4. Hash the plain password from the user
  const passwordHash = await bcrypt.hash(result.data.password, 12);

  // 5. Save the user information with the hashed password in the database
  const newUser = await createUserInsecure(
    result.data.username,
    passwordHash,
    result.data.firstName,
    result.data.lastName,
    result.data.emailAddress,
    result.data.birthday,
    result.data.gender || null,
    result.data.storeName || null,
    result.data.uAddress || null,
    result.data.roleId,
  );

  if (!newUser) {
    return NextResponse.json(
      {
        errors: [
          {
            message: 'Registration failed',
          },
        ],
      },
      {
        status: 400,
      },
    );
  }

  // 6. Create a token
  const token = crypto.randomBytes(100).toString('base64');

  // 7. Create the session record
  const session = await createSessionInsecure(newUser.id, token);

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

  const cookieStore = await cookies();
  const guestCartItems = parseGuestCartCookie(cookieStore.get('guestCart')?.value);

  cookieStore.set({
    name: 'sessionToken',
    value: session.token,
    ...secureCookieOptions,
  });

  if (guestCartItems.length > 0) {
    for (const item of guestCartItems) {
      await createOrUpdateCartItem(session.token, item.productId, item.quantity);
    }

    cookieStore.set({
      name: 'guestCart',
      value: '',
      path: '/',
      maxAge: 0,
    });
  }

  // 8. Return the new user information
  return NextResponse.json({
    user: {
      username: newUser.username,
      roleId: newUser.roleId,
    },
  });
}
