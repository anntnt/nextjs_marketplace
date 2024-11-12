import { cache } from 'react';
import { z } from 'zod';
import type { Session } from '../migrations/0010-createTableSessions';
import { sql } from './connect';

export type ProductsFromCart = {
  productId: number;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
};
export type CartProduct = {
  productId: number;
  quantity: number;
};
export type CartSum = {
  totalamount: string;
};
export const cartProductSchema = z.object({
  productId: z.number(),
  quantity: z.number(),
});

export const getCartProducts = cache(async (sessionToken: string) => {
  const cartProducts = await sql<ProductsFromCart[]>`
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
export const createOrUpdateCartItem = cache(
  async (
    sessionToken: Session['token'],
    productId: number,
    quantity: number,
  ) => {
    const [cart_product] = await sql<CartProduct[]>`
      INSERT INTO
        carts_products (product_id, amount, user_id) (
          SELECT
            ${productId},
            ${quantity},
            sessions.user_id
          FROM
            sessions
          WHERE
            token = ${sessionToken}
            AND sessions.expiry_timestamp > now()
        )
      ON CONFLICT (product_id, user_id) DO
      UPDATE
      SET
        amount = carts_products.amount + ${quantity}
      RETURNING
        carts_products.*;
    `;

    return cart_product;
  },
);

export const getCartSum = cache(async (sessionToken: Session['token']) => {
  const [cartSum] = await sql<CartSum[]>`
    SELECT
      cast(sum(amount) AS varchar(50)) AS totalamount
    FROM
      carts_products
      INNER JOIN sessions ON (
        sessions.user_id = carts_products.user_id
        AND sessions.expiry_timestamp > now()
      )
    WHERE
      sessions.token = ${sessionToken}
  `;
  console.log('cartSum', cartSum);

  return cartSum;
});
