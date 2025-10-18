import crypto from 'node:crypto';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { createSessionInsecure } from '../../../../database/sessions';
import {
  createUserInsecure,
  getUserByEmailInsecure,
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
    const friendlyFieldNames: Record<string, string> = {
      username: 'Username',
      password: 'Password',
      firstName: 'First name',
      lastName: 'Last name',
      emailAddress: 'Email address',
      birthday: 'Birth date',
      gender: 'Gender',
      storeName: 'Store name',
      uAddress: 'Address',
      roleId: 'Role',
    };

    const friendlyRequiredMessages: Record<string, string> = {
      username: 'Please enter your username.',
      password: 'Please enter your password.',
      firstName: 'Please enter your first name.',
      lastName: 'Please enter your last name.',
      emailAddress: 'Please enter your email address.',
      birthday: 'Please enter your birth date.',
      gender: 'Please select your gender.',
      storeName: 'Please enter your store name.',
      uAddress: 'Please enter your address.',
      roleId: 'Please choose a role.',
    };

    const flattenedErrors = result.error.flatten();
    const fieldErrorMessages = Object.entries(flattenedErrors.fieldErrors).flatMap(
      ([field, messages]) =>
        (messages ?? []).map((rawMessage) => {
          const label = friendlyFieldNames[field] ?? field;
          const friendlyMessage =
            rawMessage === 'Required' && friendlyRequiredMessages[field]
              ? friendlyRequiredMessages[field]
              : rawMessage;
          return `${label}: ${friendlyMessage}`;
        }),
    );

    const formErrorMessages = flattenedErrors.formErrors ?? [];
    const formattedErrors = [...fieldErrorMessages, ...formErrorMessages].map((message) => ({
      message,
    }));

    return NextResponse.json(
      {
        errors:
          formattedErrors.length > 0
            ? formattedErrors
            : [{ message: 'Please check the form and try again.' }],
      },
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
            message:
              'Username: The username you entered is already taken. Please choose a different one.',
          },
        ],
      },
      {
        status: 400,
      },
    );
  }

  const userWithEmail = await getUserByEmailInsecure(result.data.emailAddress);

  if (userWithEmail) {
    return NextResponse.json(
      {
        errors: [
          {
            message:
              'Email address: The email address you entered is already in use. Please use a different one.',
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
            message: 'Registration failed. Please check your information and try again.',
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
            message: 'There was a problem starting your session. Please try again.',
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
      // Assuming roleId is not available, remove it or replace with a default value
      roleId: 0, // Replace 0 with an appropriate default or fetch it from another source
    },
  });
}
