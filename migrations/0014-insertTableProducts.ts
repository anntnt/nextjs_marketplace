import type { Sql } from 'postgres';

export async function up(sql: Sql) {
  // Get category IDs
  const categories = await sql<{ id: number }[]>`
    SELECT
      id
    FROM
      product_categories
  `;
  const categoryIds = categories.map((row) => row.id);

  const products = [];
  const now = new Date();

  for (let i = 1; i <= 1000; i++) {
    const name = `Dummy Product ${i}`;
    const description = `Description for dummy product ${i}`;
    const price = (Math.random() * 100).toFixed(2);
    const image_url =
      'https://res.cloudinary.com/dnglmyclj/image/upload/c_fill,w_640,h_404/v1749471355/placeholder_yab9lx.jpg';
    const seller_id = Math.random() < 0.5 ? 1 : 3;
    const category_id =
      categoryIds[Math.floor(Math.random() * categoryIds.length)];

    products.push({
      name,
      price,
      image_url,
      description,
      seller_id,
      category_id,
    });
  }

  // Bulk insert (batched for performance and size limit reasons)
  const chunkSize = 100;
  for (let i = 0; i < products.length; i += chunkSize) {
    const chunk = products.slice(i, i + chunkSize);
    const values = chunk.flatMap((p) => [
      p.name ?? '',
      p.description ?? '',
      p.price ?? 0,
      p.image_url ?? '',
      p.seller_id ?? 0,
      p.category_id ?? 0,
    ]);

    const valuePlaceholders = chunk
      .map(
        (_, i) =>
          `($${i * 6 + 1}, $${i * 6 + 2}, $${i * 6 + 3}, $${i * 6 + 4}, $${i * 6 + 5}, $${i * 6 + 6})`,
      )
      .join(', ');

    await sql.unsafe(
      `
      INSERT INTO products (
        name,
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
    WHERE
      name LIKE 'Dummy Product %'
  `;
}
