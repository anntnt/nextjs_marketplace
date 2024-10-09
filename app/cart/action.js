'use server';
import { stringifyCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { cookies } from 'next/headers';
import { getCookie, setCookie } from '../../util/cookies';
import { parseJson } from '../../util/json';

export default async function deleteProductFromCartCookie(productId) {
  const productQuantitiesCookie = await getCookie('cart');

  // A: If there is no productQuantitiesCookie then create am empty array, else copy cookie value into productQuantities array
  const productQuantities =
    productQuantitiesCookie === undefined
      ? []
      : parseJson(productQuantitiesCookie);

  // find product object in cookie 'cart' then remove it from cookie 'cart', by removing this object from array productQuantities and update the cookie by setCookie
  if (productQuantities) {
    const productIndex = productQuantities.findIndex(
      (key) => key.id === parseInt(productId),
    );
    productQuantities.splice(productIndex, 1);
    await setCookie('cart', JSON.stringify(productQuantities));
  }
}
