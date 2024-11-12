import type { Sql } from 'postgres';

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE orders_products (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      order_id integer NOT NULL REFERENCES orders (id) ON DELETE cascade,
      product_id integer NOT NULL REFERENCES products (id) ON DELETE cascade,
      amount integer NOT NULL
    )
  `;
  // Create the unique index on (product_id, user_id)
  await sql` CREATE UNIQUE index ON orders_products (order_id, product_id); `;
}

export async function down(sql: Sql) {
  await sql`DROP TABLE orders_products`;
}
