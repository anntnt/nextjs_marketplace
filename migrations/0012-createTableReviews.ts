import type { Sql } from 'postgres';

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE reviews (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      star int NOT NULL,
      review_content text,
      product_id integer REFERENCES products (id),
      user_id integer REFERENCES users (id)
    )
  `;
}

export async function down(sql: Sql) {
  await sql`DROP TABLE reviews`;
}
