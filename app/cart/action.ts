'use server';

import type { ProductQuantityInCart } from '../../util/cart';
import { getCookie, setCookie } from '../../util/cookies';
import { parseJson } from '../../util/json';

export default async function deleteProductFromCartCookie(productId: number) {
  const productQuantitiesCookie = await getCookie('cart');

  // A: If there is no productQuantitiesCookie then create am empty array, else copy cookie value into productQuantities array
  /* const productQuantities =
    productQuantitiesCookie === undefined
      ? []
      : parseJson(productQuantitiesCookie);*/
  const productQuantities: ProductQuantityInCart[] =
    parseJson(productQuantitiesCookie) || [];

  // find product object in cookie 'cart' then remove it from cookie 'cart', by removing this object from array productQuantities and update the cookie by setCookie
  // if (productQuantities) {
  const productIndex = productQuantities.findIndex(
    (key) => key.productId === productId,
  );
  productQuantities.splice(productIndex, 1);
  await setCookie('cart', JSON.stringify(productQuantities));
  // }
}
