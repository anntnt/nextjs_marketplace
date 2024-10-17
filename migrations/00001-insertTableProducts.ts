import type { Sql } from 'postgres';

const products = [
  {
    id: 1,
    name: 'Cashew nuts',
    price: 6,
    image: 'cashew-nuts.jpg',
    description:
      'Cashew nuts are rich, buttery seeds packed with healthy fats, protein, and essential nutrients. Perfect for snacking or cooking, they offer a creamy texture and delicious flavor.',
  },
  {
    id: 2,
    name: 'Lychee',
    price: 10,
    image: 'lychee.jpg',
    description: 'Lychee',
  },
  {
    id: 3,
    name: 'Mango',
    price: 13,
    image: 'mango.jpg',
    description: 'Mango',
  },
  {
    id: 4,
    name: 'Coconut',
    price: 7,
    image: 'coconut.jpg',
    description: 'Coconut',
  },
  {
    id: 5,
    name: 'Dried Pineapple',
    price: 6,
    image: 'dried-pineapple.jpg',
    description: 'Dried Pineapple',
  },
  {
    id: 6,
    name: 'Instant noodles',
    price: 7,
    image: 'instant-noodles.jpg',
    description: 'Instant noodles',
  },
];

export async function up(sql: Sql) {
  for (const product of products) {
    await sql`
      INSERT INTO
        products (
          name,
          price,
          image,
          description
        )
      VALUES
        (
          ${product.name},
          ${product.price},
          ${product.image},
          ${product.description}
        )
    `;
  }
}

export async function down(sql: Sql) {
  for (const product of products) {
    await sql`
      DELETE FROM products
      WHERE
        id = ${product.id}
    `;
  }
}
