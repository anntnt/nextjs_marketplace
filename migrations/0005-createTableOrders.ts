import type { Sql } from 'postgres';

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE orders (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      buyer_id integer NOT NULL REFERENCES users (id),
      payment_type varchar(20) NOT NULL,
      order_status varchar(20) NOT NULL,
      order_date timestamp NOT NULL,
      shipping_date timestamp,
      delivery_date timestamp
    )
  `;
}

export async function down(sql: Sql) {
  await sql`DROP TABLE orders`;
}
