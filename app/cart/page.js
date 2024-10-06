import Image from 'next/image';
import Link from 'next/link';
import { getProducts } from '../../database/products';
import { getCookie } from '../../util/cookies';
import { parseJson } from '../../util/json';
import styles from './page.module.scss';

export const metadata = {
  title: 'Cart',
  description: 'Cart',
};
export default async function CartPage() {
  const products = getProducts();
  const productQuantitiesCookie = await getCookie('productQuantities');
  let productQuantities = parseJson(productQuantitiesCookie) || [];

  if (!Array.isArray(productQuantities)) {
    productQuantities = [];
  }
  if (!productQuantitiesCookie)
    return (
      <div>
        <h1> Cart </h1>

        <p className={styles.cartContent}>
          Product Quantities Cookie: {productQuantitiesCookie}
        </p>
        <p className={styles.cartContent}>Your cart is empty</p>
      </div>
    );

  return (
    <div>
      Product Quantities Cookie: {productQuantitiesCookie}
      <h1> Cart </h1>
      <div className={styles.cartContent}>
        {products.map((product) => {
          const productQuantity = productQuantities.find(
            (productObject) => product.id == productObject.id,
          );
          const productTotalPrice = productQuantity
            ? product.price * parseInt(productQuantity.quantity)
            : 0;
          if (productTotalPrice > 0)
            return (
              <div key={`product-${product.id}`} className={styles.productWrap}>
                <Link
                  href={`/products/${product.id}`}
                  data-test-id={`product-${product.id}`}
                >
                  <Image
                    src={`/images/${product.image}`}
                    alt={product.name}
                    width={200}
                    height={200}
                  />
                </Link>
                <div className={styles.productOrder}>
                  <h3>{product.name}</h3>
                  <div>Amount: {productQuantity?.quantity}</div>
                </div>
                <h3>{productTotalPrice} €</h3>
              </div>
            );
        })}
      </div>
    </div>
  );
}
