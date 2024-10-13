import { getProductsInsecure } from '../../database/products';
import { getCookie } from '../../util/cookies';
import { parseJson } from '../../util/json';

// create a array of products in cart
export default async function productsFromCart() {
  const products = await getProductsInsecure();
  const productQuantitiesCookie = await getCookie('cart');
  const productQuantities = parseJson(productQuantitiesCookie) || [];

  const cartProducts = products
    .filter((product) =>
      productQuantities.some(
        (productQuantity) => product.id === productQuantity.id,
      ),
    )
    .map((product) => {
      const productQuantityInCart = productQuantities.find(
        (productQuantity) => product.id === productQuantity.id,
      );
      return {
        ...product,
        quantity: parseInt(productQuantityInCart.quantity),
        totalPrice:
          parseInt(product.price) * parseInt(productQuantityInCart.quantity),
      };
    });
  /* console.log('cartProducts:' + JSON.stringify(cartProducts));
  console.log('productQuantities:' + JSON.stringify(productQuantities));
  console.log('cartProducts:' + JSON.stringify(cartProducts));*/
  return cartProducts;
}
