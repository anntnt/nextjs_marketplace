// database/searchProducts.ts

import { cache } from 'react';
import { sql } from './connect';
import type { Product } from './products';

// Your original, unpaginated function stays as is
export const getSearchProductsInsecure = cache(async (query: string) => {
  const searchString1 = `% ${query} %`;
  const searchString2 = `${query} %`;
  const searchString3 = `% ${query}`;
  const searchString4 = query;

  const productsRaw = await sql<
    {
      id: number;
      name: string;
      price: string;
      imageUrl: string;
      description: string;
      size: string | null;
      color: string | null;
      sellerId: number;
      categoryId: number | null;
      brand: string | null;
    }[]
  >`
    SELECT
      *
    FROM
      products
    WHERE
      name ILIKE ${searchString1}
      OR name ILIKE ${searchString2}
      OR name ILIKE ${searchString3}
      OR name ILIKE ${searchString4}
      OR description ILIKE ${searchString1}
      OR description ILIKE ${searchString2}
      OR description ILIKE ${searchString3}
      OR description ILIKE ${searchString4}
  `;
  const products: Product[] = productsRaw.map((product) => ({
    ...product,
    price: Number(product.price),
  }));
  return products;
});
// database/searchProducts.ts

export const getSearchProductsPaginatedInsecure = cache(
  async (query: string, limit = 20, offset = 0) => {
    // Simplify search patterns (you can keep yours, but for performance better just %query%)
    const pattern = `%${query}%`;

    const productsRaw = await sql<
      {
        id: number;
        name: string;
        price: string;
        imageUrl: string;
        description: string;
        size: string | null;
        color: string | null;
        sellerId: number;
        categoryId: number | null;
        brand: string | null;
      }[]
    >`
      SELECT
        *
      FROM
        products
      WHERE
        name ILIKE ${pattern}
        OR description ILIKE ${pattern}
      LIMIT
        ${limit}
      OFFSET
        ${offset}
    `;
    const products: Product[] = productsRaw.map((product) => ({
      ...product,
      price: Number(product.price),
    }));
    return products;
  },
);
