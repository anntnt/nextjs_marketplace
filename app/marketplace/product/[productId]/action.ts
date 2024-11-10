'use server';

import type { ProductQuantityInCart } from '../../../../util/cart';
import { getCookie, setCookie } from '../../../../util/cookies';
import { parseJson } from '../../../../util/json';
import { add } from '../../../../util/math';

export default async function createOrUpdateCart(
  productId: ProductQuantityInCart['productId'],
  quantity: ProductQuantityInCart['quantity'],
) {
  // 1. get current cookie!
  const sessionTokenCookie = await getCookie('sessionToken');
  // 2. Get the current logged in user from the database using the sessionToken value
  const user = sessionTokenCookie && (await getUser(sessionTokenCookie.value));

  // 2. parse the cookie value
  const productQuantities: ProductQuantityInCart[] =
    productQuantitiesCookie === undefined
      ? // Case A: cookie undefined
        []
      : parseJson(productQuantitiesCookie)!;

  // 3. edit the cookie value
  const currentProductQuantity = productQuantities.find((productQuantity) => {
    return productQuantity.productId === productId;
  });

  // Case B: cookie set, id doesn't exist
  if (!currentProductQuantity) {
    productQuantities.push({ productId: productId, quantity: quantity });
  }
  // Case C: cookie set, id exists already
  else {
    currentProductQuantity.quantity = add(
      currentProductQuantity.quantity,
      quantity,
    );
  }
  await setCookie('cart', JSON.stringify(productQuantities));
}
