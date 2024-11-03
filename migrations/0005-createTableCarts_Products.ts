import type { Sql } from 'postgres';

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE carts_products (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      product_id integer NOT NULL REFERENCES products (id) ON DELETE cascade,
      cart_id integer NOT NULL REFERENCES carts (id),
      amount integer NOT NULL
    )
  `;
}

export async function down(sql: Sql) {
  await sql`DROP TABLE carts_products cascade`;
}
