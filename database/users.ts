import { cache } from 'react';
import type { User } from '../migrations/0002-createTableUsers';
import type { Session } from '../migrations/0008-createTableSessions';
import { sql } from './connect';

export type UserWithPasswordHash = User & {
  passwordHash: string;
};

export const getUser = cache(async (sessionToken: Session['token']) => {
  const [user] = await sql<User[]>`
    SELECT
      users.id,
      users.username
    FROM
      users
      INNER JOIN sessions ON (
        sessions.user_id = users.id
        AND sessions.expiry_timestamp > now()
      )
    WHERE
      sessions.token = ${sessionToken}
  `;

  return user;
});

export const getUserInsecure = cache(async (username: User['username']) => {
  const [user] = await sql<User[]>`
    SELECT
      id,
      username
    FROM
      users
    WHERE
      username = ${username}
  `;

  return user;
});

export const createUserInsecure = cache(
  async (
    username: User['username'],
    passwordHash: UserWithPasswordHash['passwordHash'],
    firstName: User['firstName'],
    lastName: User['lastName'],
    emailAddress: User['emailAddress'],
    birthday: User['birthday'],
    gender: User['gender'],
    storeName: User['storeName'],
    uAddress: User['uAddress'],
    roleId: User['roleId'],
  ) => {
    const [user] = await sql<User[]>`
      INSERT INTO
        users (
          username,
          password_hash,
          firstname,
          lastname,
          email_address,
          birthday,
          gender,
          store_name,
          u_address,
          role_id
        )
      VALUES
        (
          ${username},
          ${passwordHash},
          ${firstName},
          ${lastName},
          ${emailAddress},
          ${birthday},
          ${gender},
          ${storeName},
          ${uAddress},
          ${roleId}
        )
      RETURNING
        users.id,
        users.username
    `;

    return user;
  },
);

export const getUserWithPasswordHashInsecure = cache(
  async (username: User['username']) => {
    const [user] = await sql<UserWithPasswordHash[]>`
      SELECT
        *
      FROM
        users
      WHERE
        username = ${username}
    `;

    return user;
  },
);
