import type { Sql } from 'postgres';

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE payment_types (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      payment_name varchar(50) NOT NULL
    )
  `;
}

export async function down(sql: Sql) {
  await sql`DROP TABLE payment_types`;
}
