import type { ProductQuantityInCart } from './cart';
import { getCookie } from './cookies';
import { parseJson } from './json';

// create a array of products in cart
export default async function itemsFromCart() {
  const productQuantitiesCookie = await getCookie('cart');
  const productQuantities: ProductQuantityInCart[] =
    parseJson(productQuantitiesCookie) || [];

  const items: number = calculateCartItems(productQuantities);

  return items;
}
export function calculateCartItems(productQuantities: ProductQuantityInCart[]) {
  const items: number = productQuantities.reduce(
    (sum, productQuantity) => sum + productQuantity.quantity,
    0,
  );
  return items;
}
