import type { Sql } from 'postgres';

export async function up(sql: Sql) {
  const categories = await sql<{ id: number }[]>`
    SELECT id FROM product_categories
  `;
  const categoryIds = categories.map((row) => row.id);

  // Dummy-Marken-Liste
  const brands = [
    'Acme Corp',
    'Global Goods',
    'Holiday Co',
    'TechBrand',
    'Everyday Essentials',
    'Generic Supplies',
    'EcoLine',
    'Festive World',
    'ValueMart',
    'SuperStore',
  ];

  const products = [];

  for (let i = 1; i <= 1000; i++) {
    const name = `Dummy Product ${i}`;
    const description = `Description for dummy product ${i}`;

    const price = Math.floor(Math.random() * 20000) + 100; 

    const image_url =
      'https://res.cloudinary.com/dnglmyclj/image/upload/c_fill,w_640,h_404/v1749471355/placeholder_yab9lx.jpg';
    const seller_id = Math.random() < 0.5 ? 1 : 3;
    const category_id =
      categoryIds[Math.floor(Math.random() * categoryIds.length)];
    const brand = brands[Math.floor(Math.random() * brands.length)];

    products.push({
      name,
      brand,
      description,
      price,
      image_url,
      seller_id,
      category_id,
    });
  }

  const chunkSize = 100;
  for (let i = 0; i < products.length; i += chunkSize) {
    const chunk = products.slice(i, i + chunkSize);
    const values = chunk.flatMap((p) => [
      p.name ?? '',
      p.brand ?? 'Generic',
      p.description ?? '',
      p.price ?? 0,
      p.image_url ?? '',
      p.seller_id ?? 0,
      p.category_id ?? 0,
    ]);

    const valuePlaceholders = chunk
      .map(
        (_, i) =>
          `($${i * 7 + 1}, $${i * 7 + 2}, $${i * 7 + 3}, $${i * 7 + 4}, $${i * 7 + 5}, $${i * 7 + 6}, $${i * 7 + 7})`,
      )
      .join(', ');

    await sql.unsafe(
      `
      INSERT INTO products (
        name,
        brand,
        description,
        price,
        image_url,
        seller_id,
        category_id
      ) VALUES ${valuePlaceholders}
      `,
      values,
    );
  }
}

export async function down(sql: Sql) {
  await sql`
    DELETE FROM products
    WHERE name LIKE 'Dummy Product %'
  `;
}
