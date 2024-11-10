import { cache } from 'react';
import { sql } from './connect';

export type CartProduct = {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  amount: number;
};

export const getCartProducts = cache(async (sessionToken: string) => {
  const notes = await sql<CartProduct[]>`
    SELECT
      carts_products.product_id,
      products.name,
      products.price,
      products.image_url,
      carts_products.amount
    FROM
      carts
      INNER JOIN sessions ON (
        sessions.token = ${sessionToken}
        AND sessions.user_id = carts.user_id
      ) (
        carts.id = carts_products.cart_id
        AND sessions.expiry_timestamp > now()
      )
  `;
  return notes;
});

export const getCartProductsInsecure = cache(async () => {
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
