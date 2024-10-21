import { cache } from 'react';
import { sql } from './connect';

export type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
};

export const getProductsInsecure = cache(async () => {
  const products = await sql<Product[]>`
    SELECT
      *
    FROM
      products
  `;

  return products;
});

export const getProductInsecure = cache(async (id: number) => {
  const [product] = await sql<Product[]>`
    SELECT
      *
    FROM
      products
    WHERE
      id = ${id}
  `;

  return product;
});
