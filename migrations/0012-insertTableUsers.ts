import type { Sql } from 'postgres';

const users = [
  {
    id: 1,
    username: 'anna',
    firstname: 'Anna',
    lastname: 'Blow',
    email_address: 'anna.blow@gmail.com',
    password_hash:
      '$2b$12$TMJ.R9bbOgbrb5QQIpy4gOJQ1czeR3V7EL.UnUrPh3ahNOffeQKYy',
    birthday: new Date('2000-11-11'),
    gender: 'female',
    store_name: 'Wonder Shop',
    address: 'Wonder Insel, 1020 Vienna, Austria',
    roleName: 'Seller',
  },
  {
    id: 2,
    username: 'johnny',
    firstname: 'Johnny',
    lastname: 'Smith',
    email_address: 'jny.smith@gmail.com',
    password_hash:
      '$2b$12$Q1LR9Bu.bqLEXopHoj//MeaIIGXVoEjNuzS1lFGP/Hy/UhvAe0aBi',
    birthday: new Date('1984-11-01'),
    gender: 'male',
    store_name: '',
    address: 'Reumannplatz 11A, 1100 Vienna, Austria',
    roleName: 'Buyer',
  },

  {
    id: 3,
    username: 'ann',
    firstname: 'Ann',
    lastname: 'Doe',
    email_address: 'a.doe@gmail.com',
    password_hash:
      '$2b$12$TMJ.R9bbOgbrb5QQIpy4gOJQ1czeR3V7EL.UnUrPh3ahNOffeQKYy',
    birthday: new Date('1989-10-01'),
    gender: 'female',
    store_name: 'Cool Decor Ideas',
    address: 'Wonder Insel, 1020 Vienna, Austria',
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
