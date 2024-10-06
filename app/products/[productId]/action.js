'use server';
import { getCookie, setCookie } from '@/util/cookies';
import { parseJson } from '@/util/json';
import { stringifyCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { cookies } from 'next/headers';

export default async function createOrUpdateCartCookie(productId, quantity) {
  const productQuantitiesCookie = await getCookie('productQuantities');

  // A: If there is no productQuantitiesCookie then create am empty array, else copy cookie value into productQuantities array
  const productQuantities =
    productQuantitiesCookie === undefined
      ? []
      : parseJson(productQuantitiesCookie);

  // check if productId is already in cookie array, then get the value of currentProductQuantity
  const currentProductQuantity = productQuantities.find((productQuantity) => {
    return productQuantity.id === productId;
  });

  // B: if currentProductQuantity isn't in cookie array, add productId and current quantity to cookie array
  if (!currentProductQuantity) {
    productQuantities.push({ id: productId, quantity: quantity });
  }
  // C: currentProductQuantity is already in cookie array
  else {
    currentProductQuantity.quantity = quantity;
  }
  await setCookie('productQuantities', JSON.stringify(productQuantities));
  //(await cookies()).set('productQuantities', JSON.stringify(productQuantities));
}
