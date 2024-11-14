import type { Sql } from 'postgres';

const users = [
  {
    id: 1,
    username: 'buyer',
    firstname: 'Buyer',
    lastname: 'B',
    email_address: 'anpjure@gmail.com',
    password_hash:
      '$2b$12$k2OUXYqqGveofPsgefyQi.p6S8.v7688hg7pQ076rav60vzNtx9j.',
    birthday: '2000-11-11',
    gender: '',
    store_name: '',
    address: '',
    role_id: 3,
  },
  {
    id: 2,
    username: 'seller1',
    firstname: 'Seller',
    lastname: '1',
    email_address: 'anpjure@gmail.com',
    password_hash:
      '$2b$12$k2OUXYqqGveofPsgefyQi.p6S8.v7688hg7pQ076rav60vzNtx9j.',
    birthday: '2000-11-11',
    gender: 'male',
    store_name: 'Oberlaa House',
    address: 'Oberlaa Park, 1100 Vienna, Austria',
    role_id: 2,
  },
  {
    id: 3,
    username: 'seller2',
    firstname: 'Seller',
    lastname: '2',
    email_address: 'ann.tran.vie@gmail.com',
    password_hash:
      '$2b$12$k2OUXYqqGveofPsgefyQi.p6S8.v7688hg7pQ076rav60vzNtx9j.',
    birthday: '2000-11-11',
    gender: 'female',
    store_name: 'Donau Store',
    address: 'Donau Park, 1220 Vienna, Austria',
    role_id: 2,
  },
];

export async function up(sql: Sql) {
  for (const user of users) {
    await sql`
      INSERT INTO
        users (
          username,
          firstname,
          lastname,
          email_address,
          password_hash,
          birthday,
          gender,
          store_name,
          address,
          role_id
        )
      VALUES
        (
          ${user.username},
          ${user.firstname},
          ${user.lastname},
          ${user.email_address},
          ${user.password_hash},
          ${user.birthday},
          ${user.gender},
          ${user.store_name},
          ${user.address},
          ${user.role_id}
        )
    `;
  }
}

export async function down(sql: Sql) {
  for (const user of users) {
    await sql`
      DELETE FROM roles
      WHERE
        id = ${user.id}
    `;
  }
}
