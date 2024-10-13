import { getCookie } from '../../util/cookies';
import { parseJson } from '../../util/json';

// create a array of products in cart
export default async function itemsFromCart() {
  const productQuantitiesCookie = await getCookie('cart');
  const productQuantities = parseJson(productQuantitiesCookie) || [];

  const items = productQuantities.reduce(
    (sum, product) => parseInt(sum) + parseInt(product.quantity),
    0,
  );
  return items;
}
