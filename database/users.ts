import { cache } from 'react';
import type { User } from '../migrations/0001-createTableUsers';
import type { Session } from '../migrations/0010-createTableSessions';
import { sql } from './connect';

export type UserWithPasswordHash = User & {
  passwordHash: string;
};
export type UserWithUsername = {
  id: number;
  username: string;
};
export type UserWithUsernameAndRole = UserWithUsername & {
  roleId: number;
};
export const getUser = cache(async (sessionToken: Session['token']) => {
  const [user] = await sql<User[]>`
    SELECT
      users.id,
      users.username,
      users.firstname,
      users.lastname,
      users.email_address,
      users.birthday,
      users.gender,
      users.store_name,
      users.address,
      users.role_id
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
  const [user] = await sql<UserWithUsername[]>`
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
    firstName: User['firstname'],
    lastName: User['lastname'],
    emailAddress: User['emailAddress'],
    birthday: User['birthday'],
    gender: User['gender'],
    storeName: User['storeName'],
    uAddress: User['address'],
    roleId: User['roleId'],
  ) => {
    const [user] = await sql<UserWithUsername[]>`
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
          address,
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
