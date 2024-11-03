import type { Sql } from 'postgres';

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE carts (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      is_ordered boolean NOT NULL,
      order_status varchar(50),
      buyer_id integer NOT NULL REFERENCES users (id),
      payment_type_id integer NOT NULL REFERENCES payment_types (id) DEFAULT 1,
      shipping_address varchar(255)
    )
  `;
}
export async function down(sql: Sql) {
  await sql`DROP TABLE carts cascade`;
}
