import { cache } from 'react';
import { z } from 'zod';
import type { Session } from '../migrations/0010-createTableSessions';
import { sql } from './connect';

export type CartProduct = {
  productId: number;
  name: string;
  price: number;
  imageUrl: string;
  amount: number;
};
export const cartProductSchema = z.object({
  productId: z.number(),
  amount: z.number(),
  userId: z.number(),
});

export const getCartProducts = cache(async (sessionToken: string) => {
  const cartProducts = await sql<CartProduct[]>`
    SELECT
      carts_products.product_id,
      products.name,
      products.price,
      products.image_url,
      carts_products.amount
    FROM
      carts_products
      INNER JOIN sessions ON sessions.token = ${sessionToken}
      AND sessions.user_id = carts_products.user_id
      AND sessions.expiry_timestamp > now()
      INNER JOIN products ON carts_products.product_id = products.id
  `;
  return cartProducts;
});
export const createCartProduct = cache(
  async (sessionToken: Session['token'], productId: number, amount: number) => {
    const [cart_product] = await sql<CartProduct[]>`
      INSERT INTO
        carts_product (product_id, amount, user_id) (
          SELECT
            ${productId},
            ${amount},
            sessions.user_id
          FROM
            sessions
          WHERE
            token = ${sessionToken}
            AND sessions.expiry_timestamp > now()
        )
      RETURNING
        cart_product.*
    `;

    return cart_product;
  },
);
