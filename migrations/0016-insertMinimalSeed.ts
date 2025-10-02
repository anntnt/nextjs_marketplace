import type { Sql } from 'postgres';

const CATEGORY_IMAGE_PLACEHOLDER =
  'https://res.cloudinary.com/dnglmyclj/image/upload/c_fill,w_640,h_404/v1749471355/placeholder_yab9lx.jpg';

export async function up(sql: Sql) {
  await sql`
    INSERT INTO product_categories (category_name, image_url)
    SELECT 'Sample Category', ${CATEGORY_IMAGE_PLACEHOLDER}
    WHERE NOT EXISTS (
      SELECT 1
      FROM product_categories
      WHERE category_name = 'Sample Category'
    )
  `;

  await sql`
    INSERT INTO products (
      name,
      brand,
      description,
      price,
      image_url,
      seller_id,
      category_id
    )
    SELECT
      'Sample Product',
      'Acme',
      'Sample product used to keep the marketplace populated while running migrations locally.',
      1500,
      ${CATEGORY_IMAGE_PLACEHOLDER},
      seller.id,
      category.id
    FROM (
      SELECT id
      FROM users
      WHERE role_id = 2
      ORDER BY id
      LIMIT 1
    ) AS seller
    CROSS JOIN (
      SELECT id
      FROM product_categories
      WHERE category_name = 'Sample Category'
      ORDER BY id
      LIMIT 1
    ) AS category
    WHERE NOT EXISTS (
      SELECT 1
      FROM products
      WHERE name = 'Sample Product'
        AND brand = 'Acme'
    )
  `;
}

export async function down(sql: Sql) {
  await sql`
    DELETE FROM products
    WHERE name = 'Sample Product' AND brand = 'Acme'
  `;

  await sql`
    DELETE FROM product_categories
    WHERE category_name = 'Sample Category'
  `;
}
