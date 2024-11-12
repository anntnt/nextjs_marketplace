import type { Sql } from 'postgres';

const roles = [
  {
    id: 1,
    name: 'Provider',
  },
  {
    id: 2,
    name: 'Seller',
  },
  {
    id: 3,
    name: 'Buyer',
  },
  {
    id: 4,
    name: 'Supporter',
  },
];

export async function up(sql: Sql) {
  for (const role of roles) {
    await sql`
      INSERT INTO
        roles (id, name)
      VALUES
        (
          ${role.id},
          ${role.name}
        )
    `;
  }
}

export async function down(sql: Sql) {
  for (const role of roles) {
    await sql`
      DELETE FROM roles
      WHERE
        id = ${role.id}
    `;
  }
}
