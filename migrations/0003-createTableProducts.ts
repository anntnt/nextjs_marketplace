import type { Sql } from 'postgres';

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE products (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      name varchar(60) NOT NULL,
      brand varchar(60),
      price integer NOT NULL,
      image_url varchar(255) NOT NULL,
      description text NOT NULL,
      size varchar(50),
      color varchar(50),
      seller_id integer NOT NULL REFERENCES users (id) ON DELETE cascade,
      category_id integer REFERENCES product_categories (id)
    )
  `;
}

export async function down(sql: Sql) {
  await sql`DROP TABLE products`;
}
