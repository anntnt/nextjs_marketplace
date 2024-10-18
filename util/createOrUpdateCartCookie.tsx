'use server';

import { getCookie, setCookie } from './cookies';
import { parseJson } from './json';

export type Cart = {
  id: number;
  quantity: string;
};
export default async function createOrUpdateCartCookie(
  productId: Cart['id'],
  quantity: Cart['quantity'],
) {
  // 1. get current cookie!
  const productQuantitiesCookie = await getCookie('cart');

  // 2. parse the cookie value
  const productQuantities: Cart[] =
    productQuantitiesCookie === undefined
      ? // Case A: cookie undefined
        []
      : parseJson(productQuantitiesCookie)!;

  // 3. edit the cookie value
  const currentProductQuantity = productQuantities.find((productQuantity) => {
    return productQuantity.id === productId;
  });

  // Case B: cookie set, id doesn't exist
  if (!currentProductQuantity) {
    productQuantities.push({ id: productId, quantity: quantity });
  }
  // Case C: cookie set, id exists already
  else {
    currentProductQuantity.quantity = (
      parseInt(currentProductQuantity.quantity) + parseInt(quantity)
    ).toString();
  }
  await setCookie('cart', JSON.stringify(productQuantities));
}
