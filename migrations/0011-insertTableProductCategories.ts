import type { Sql } from 'postgres';

const product_categories = [
  {
    id: 1,
    name: 'Food & Grocery',
  },
  {
    id: 2,
    name: 'Pictures',
  },
  {
    id: 3,
    name: 'Furniture',
  },
];

export async function up(sql: Sql) {
  for (const product_category of product_categories) {
    await sql`
      INSERT INTO
        product_categories (category_name)
      VALUES
        (
          ${product_category.name}
        )
    `;
  }
}

export async function down(sql: Sql) {
  for (const product_category of product_categories) {
    await sql`
      DELETE FROM product_categories
      WHERE
        id = ${product_category.id}
    `;
  }
}
