import type { Sql } from 'postgres';

const CATEGORY_IMAGE_PLACEHOLDER =
  'https://res.cloudinary.com/dnglmyclj/image/upload/c_fill,w_640,h_404/v1749471355/placeholder_yab9lx.jpg';

export async function up(sql: Sql) {
  await sql`
    TRUNCATE TABLE products RESTART IDENTITY CASCADE
  `;

  const categories = await sql<{ id: number }[]>`
    SELECT id FROM product_categories
    ORDER BY id
  `;
  const categoryIds = categories.map((row) => row.id);

  if (categoryIds.length === 0) {
    throw new Error('Cannot seed products without product categories');
  }

  const sellers = await sql<{ id: number }[]>`
    SELECT id FROM users WHERE role_id = 2 ORDER BY id
  `;
  const sellerIds = sellers.map((seller) => seller.id);

  if (sellerIds.length === 0) {
    throw new Error('Cannot seed products without seller users');
  }

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

  const loremWords = [
    'lorem',
    'ipsum',
    'dolor',
    'sit',
    'amet',
    'consectetur',
    'adipiscing',
    'elit',
    'sed',
    'do',
    'eiusmod',
    'tempor',
    'incididunt',
    'ut',
    'labore',
    'et',
    'dolore',
    'magna',
    'aliqua',
    'enim',
    'ad',
    'minim',
    'veniam',
    'quis',
    'nostrud',
    'exercitation',
    'ullamco',
    'laboris',
    'nisi',
    'aliquip',
    'ex',
    'ea',
    'commodo',
    'consequat',
    'duis',
    'aute',
    'irure',
    'in',
    'reprehenderit',
    'voluptate',
    'velit',
    'esse',
    'cillum',
    'fugiat',
    'nulla',
    'pariatur',
    'excepteur',
    'sint',
    'occaecat',
    'cupidatat',
    'non',
    'proident',
    'sunt',
    'culpa',
    'qui',
    'officia',
    'deserunt',
    'mollit',
    'anim',
    'id',
    'est',
    'laborum',
  ];

  const capitalize = (word: string) =>
    word.charAt(0).toUpperCase() + word.slice(1);

  const generateProduct = (seed: number, categoryId: number, sellerId: number) => {
    const startIndex = seed % loremWords.length;
    const nameWordCount = 3 + (seed % 3); // 3, 4, or 5 words
    const nameWords: string[] = [];
    const descWords: string[] = [];

    for (let offset = 0; offset < nameWordCount; offset++) {
      const word = loremWords[(startIndex + offset) % loremWords.length] ?? '';
      nameWords.push(capitalize(word));
      descWords.push(word);
    }

    const name = nameWords.join(' ').slice(0, 60);
    const description = `Lorem ipsum dolor sit amet, ${descWords.join(' ')} tempor incididunt ut labore et dolore magna aliqua.`;

    const price = Math.floor(Math.random() * 145 * 100 + 500); // store as cents (€5.00 - €149.99)

    const image_url = CATEGORY_IMAGE_PLACEHOLDER;
    const brand = brands[Math.floor(Math.random() * brands.length)];

    return {
      name,
      brand,
      description,
      price,
      image_url,
      seller_id: sellerId,
      category_id: categoryId,
    };
  };

  const products = [];

  // Ensure every category receives at least 90 products
  categoryIds.forEach((categoryId, index) => {
    const sellerId = sellerIds[index % sellerIds.length];
    for (let count = 0; count < 90; count++) {
      const seed = index * 1000 + count;
      products.push(generateProduct(seed, categoryId, sellerId));
    }
  });

  // Generate additional products to reach at least 90 per category even if there are few categories
  const minimumTotal = categoryIds.length * 90;
  const targetTotal = Math.max(minimumTotal, 1200);
  for (let i = products.length; i < targetTotal; i++) {
    const categoryId = categoryIds[i % categoryIds.length];
    const sellerId = sellerIds[i % sellerIds.length];
    products.push(generateProduct(i + 12345, categoryId, sellerId));
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
    WHERE name LIKE 'Generated Product - %'
      OR name LIKE 'Dummy Product %'
      OR description LIKE 'Lorem ipsum dolor sit amet% tempor incididunt%'
  `;
}
