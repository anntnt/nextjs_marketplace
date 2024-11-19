import { cache } from 'react';
import { z } from 'zod';
import type { Session } from '../migrations/0010-createTableSessions';
import { sql } from './connect';

//type of cart products in database
export type ProductFromCart = {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
};
//type of cart products on the session, which were added to cart by users
export type CartProduct = {
  productId: number;
  quantity: number;
};
//Total cart items
export type CartSum = {
  totalamount: string;
};
export const cartProductSchema = z.object({
  productId: z.number(),
  quantity: z.number(),
});

export const getCartProducts = cache(async (sessionToken: string) => {
  const cartProducts = await sql<ProductFromCart[]>`
    SELECT
      carts_products.product_id AS id,
      products.name,
      products.price,
      products.image_url,
      carts_products.amount AS quantity
    FROM
      carts_products
      INNER JOIN sessions ON sessions.token = ${sessionToken}
      AND sessions.user_id = carts_products.user_id
      AND sessions.expiry_timestamp > now()
      INNER JOIN products ON carts_products.product_id = products.id
    ORDER BY
      id;
  `;
  return cartProducts;
});
export const removeCartProducts = cache(
  async (sessionToken: string, id: number) => {
    const [cartProduct] = await sql<ProductFromCart[]>`
      DELETE FROM carts_products USING sessions
      WHERE
        sessions.token = ${sessionToken}
        AND sessions.expiry_timestamp > now()
        AND sessions.user_id = carts_products.user_id
        AND carts_products.product_id = ${id}
      RETURNING
        carts_products.*
    `;
    return cartProduct;
  },
);
export const updateCartItem = cache(
  async (
    sessionToken: Session['token'],
    productId: number,
    quantity: number,
  ) => {
    const [cart_product] = await sql<CartProduct[]>`
      UPDATE carts_products
      SET
        amount = ${quantity}
      FROM
        sessions
      WHERE
        token = ${sessionToken}
        AND sessions.expiry_timestamp > now()
        AND sessions.user_id = carts_products.user_id
        AND carts_products.product_id = ${productId}
      RETURNING
        carts_products.*;
    `;

    return cart_product;
  },
);
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

  return cartSum;
});
