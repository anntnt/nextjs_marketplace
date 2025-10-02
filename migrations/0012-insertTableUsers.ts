import type { Sql } from 'postgres';

const users = [
  {
    username: 'seller',
    firstname: 'Seller',
    lastname: 'Account',
    email_address: 'seller@example.com',
    password_hash: '$2b$12$kuJhBH.OuqYbqx0OG4HXj.nmkBUP79mIvJPi6KaGmkz.C5cpmnPpG',
    birthday: new Date('1990-01-01'),
    gender: null,
    store_name: 'Sample Seller Store',
    address: '123 Sample Street, Sample City',
    roleName: 'Seller',
  },
  {
    username: 'buyer',
    firstname: 'Buyer',
    lastname: 'Account',
    email_address: 'buyer@example.com',
    password_hash: '$2b$12$Ugr6VTE3UbKTCFmNzGQeqOqh/6NTyITUN0NNiOfAjNNg9HwRZ4yJm',
    birthday: new Date('1992-02-02'),
    gender: null,
    store_name: null,
    address: '456 Example Avenue, Example City',
    roleName: 'Buyer',
  },
  {
    username: 'seller2',
    firstname: 'Seller',
    lastname: 'Two',
    email_address: 'seller2@example.com',
    password_hash: '$2b$12$5PuDK3588gdI6up1nHKJLuX6Kop8bpP61oYXL/Er/DKJ5HI6wB2PS',
    birthday: new Date('1991-03-03'),
    gender: null,
    store_name: 'Seller 2 Store',
    address: 'Seller 2 Address',
    roleName: 'Seller',
  },
  {
    username: 'seller3',
    firstname: 'Seller',
    lastname: 'Three',
    email_address: 'seller3@example.com',
    password_hash: '$2b$12$bZHoCCZL2NNNzfW.34TKD.9DDFKarJzoE/jemxQI6oB59YvaTTgGq',
    birthday: new Date('1993-04-04'),
    gender: null,
    store_name: 'Seller 3 Store',
    address: 'Seller 3 Address',
    roleName: 'Seller',
  },
];

export async function up(sql: Sql) {
  const roles = await sql<{ id: number; name: string }[]>`
    SELECT id, name FROM roles
  `;

  const roleIdByName = new Map(roles.map((role) => [role.name, role.id]));

  for (const user of users) {
    let roleId = roleIdByName.get(user.roleName);

    if (!roleId) {
      const [newRole] = await sql<{ id: number }[]>`
        INSERT INTO roles (name)
        VALUES (${user.roleName})
        RETURNING id
      `;
      if (!newRole) {
        throw new Error(`Failed to insert role: ${user.roleName}`);
      }
      roleId = newRole.id;
      roleIdByName.set(user.roleName, roleId);
    }

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
          ${roleId}
        )
    `;
  }
}

export async function down(sql: Sql) {
  for (const user of users) {
    await sql`
      DELETE FROM users
      WHERE
        username = ${user.username}
    `;
  }
}
