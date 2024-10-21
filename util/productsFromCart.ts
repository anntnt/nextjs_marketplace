import type { Product } from '../database/products';
import { getProductsInsecure } from '../database/products';
import type { DataOfProductInCart, ProductQuantityInCart } from './cart';
import { getCookie } from './cookies';
import { parseJson } from './json';

// create a array of products in cart
export default async function productsFromCart() {
  const products: Product[] = await getProductsInsecure();
  const productQuantitiesCookie = await getCookie('cart');
  const productQuantities: ProductQuantityInCart[] =
    parseJson(productQuantitiesCookie) || [];

  const cartProducts: DataOfProductInCart[] = combineProductData(
    products,
    productQuantities,
  );
  /* console.log('cartProducts:' + JSON.stringify(cartProducts));
  console.log('productQuantities:' + JSON.stringify(productQuantities));
  console.log('cartProducts:' + JSON.stringify(cartProducts));*/
  return cartProducts;
}

export function combineProductData(
  products: Product[],
  productQuantities: ProductQuantityInCart[],
) {
  const cartProducts: DataOfProductInCart[] = products
    .filter((product) =>
      productQuantities.some(
        (productQuantity) => product.id === productQuantity.productId,
      ),
    )
    .map((product) => {
      const currentProductQuantity = productQuantities.find(
        (productQuantity) => product.id === productQuantity.productId,
      ) ?? { productId: product.id, quantity: 0 };
      return {
        ...product,
        quantity: currentProductQuantity.quantity,
        totalPrice: product.price * currentProductQuantity.quantity,
      };
    });
  return cartProducts;
}
