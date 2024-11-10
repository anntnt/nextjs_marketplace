import type { Sql } from 'postgres';
import { z } from 'zod';

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE carts (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      user_id integer NOT NULL REFERENCES users (id) ON DELETE cascade
    )
  `;
}

export async function down(sql: Sql) {
  await sql`DROP TABLE carts`;
}
