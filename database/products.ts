import { cache } from 'react';
import { sql } from './connect';

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
  async (categoryId: number, productId: number) => {
    const [product] = await sql<ProductWithSeller[]>`
      SELECT
        products.*,
        users.store_name
      FROM
        products
        INNER JOIN users ON products.seller_id = users.id
      WHERE
        products.category_id = ${categoryId}
        AND products.id = ${productId}
    `;

    return product;
  },
);
