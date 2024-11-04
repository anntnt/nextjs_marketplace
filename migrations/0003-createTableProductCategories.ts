import type { Sql } from 'postgres';

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE product_categories (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      category_name varchar(30) NOT NULL,
      parent_category_id integer REFERENCES product_categories (id)
    )
  `;
}

export async function down(sql: Sql) {
  await sql`DROP TABLE product_categories`;
}
