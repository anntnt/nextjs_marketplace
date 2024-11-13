import { cache } from 'react';
import { sql } from './connect';
import type { Session } from '../migrations/0010-createTableSessions';
import { z } from 'zod';

export const removeProductSchema = z.object({
  id: z.number(),
});

export type Product = {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  description: string;
  size: string;
  color: string;
  sellerId: string;
  categoryId: number;
};

export type ProductWithSeller = {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  description: string;
  size: string;
  color: string;
  sellerId: string;
  storeName: string;
  categoryId: number;
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

export const getCategoryProductsInsecure = cache(async (categoryId: number) => {
  const products = await sql<Product[]>`
    SELECT
      *
    FROM
      products
    WHERE
      category_id = ${categoryId}
  `;

  return products;
});

export const getCategoryProductWithSellerInsecure = cache(
  async (productId: number) => {
    const [product] = await sql<ProductWithSeller[]>`
      SELECT
        products.*,
        users.store_name
      FROM
        products
        INNER JOIN users ON products.seller_id = users.id
      WHERE
        products.id = ${productId}
    `;

    return product;
  },
);

export const getProductsOfSeller = cache(
  async (sessionToken: Session['token']) => {
    const products = await sql<Product[]>`
      SELECT
        products.*
      FROM
        products
        INNER JOIN sessions ON products.seller_id = sessions.user_id
      WHERE
        sessions.token = ${sessionToken}
        AND sessions.expiry_timestamp > now()
    `;

    return products;
  },
);
export const removeProduct = cache(
  async (id: number, sessionToken: Session['token']) => {
    console.log('id2 ', id);
    console.log('sessionToken2 ', sessionToken);
    const [product] = await sql<Product[]>`
      DELETE FROM products USING sessions
      WHERE
        sessions.token = ${sessionToken}
        AND sessions.expiry_timestamp > now()
        AND products.id = ${id}
        AND products.seller_id = sessions.user_id
      RETURNING
        products.*
    `;

    return product;
  },
);
