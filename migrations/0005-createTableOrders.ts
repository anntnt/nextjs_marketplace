import type { Sql } from 'postgres';

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE orders (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      buyer_id integer NOT NULL REFERENCES users (id),
      payment_type varchar(20) NOT NULL,
      delivery_type varchar(20) NOT NULL,
      status varchar(20) NOT NULL,
      order_timestamp timestamp NOT NULL,
      shipping_timestamp timestamp,
      delivery_timestamp timestamp
    )
  `;
}

export async function down(sql: Sql) {
  await sql`DROP TABLE orders`;
}
