import type { Sql } from 'postgres';

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE roles (
      id integer PRIMARY KEY,
      name varchar(50) NOT NULL
    )
  `;
}

export async function down(sql: Sql) {
  await sql`DROP TABLE roles`;
}
