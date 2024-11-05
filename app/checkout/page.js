import Image from 'next/image';
import Link from 'next/link';
import { getCookie } from '../../util/cookies';
import { parseJson } from '../../util/json';
import productsFromCart from '../../util/productsFromCart';
import CheckoutForm from './checkoutForm';
import styles from './page.module.scss';

export const metadata = {
  title: 'Checkout',
  description: 'Checkout page',
};
export default async function checkOutPage() {
  let orderPrice = 0;
  let totalProducts = 0;
  const productQuantitiesCookie = await getCookie('cart');
  let productQuantities = parseJson(productQuantitiesCookie) || [];

  if (!Array.isArray(productQuantities)) {
    productQuantities = [];
  }

  if (!productQuantitiesCookie || productQuantities.length === 0) {
    return (
      <div>
        <h1> Cart </h1>

        <p className={styles.cartContent}>Your cart is empty</p>
      </div>
    );
  }

  const cartProducts = await productsFromCart();
  return (
    <div>
      <h1 className="mb-4 text-4xl text-center">Checkout</h1>
      {/* <p>Cart cookie: {productQuantitiesCookie}</p>*/}
      <CheckoutForm />
      <div className={styles.cartContent}>
        {cartProducts.map((cartProduct) => {
          orderPrice += cartProduct.totalPrice;
          totalProducts += cartProduct.quantity;

          return (
            <div
              key={`product-${cartProduct.id}`}
              className={styles.productWrap}
              data-test-id={`cart-product-${cartProduct.id}`}
            >
              <Link
                href={`/products/${cartProduct.id}`}
                data-test-id={`product-${cartProduct.id}`}
              >
                <Image
                  src={`/images/${cartProduct.image}`}
                  alt={cartProduct.name}
                  width={100}
                  height={100}
                />
              </Link>
              <div className={styles.productOrder}>
                <h3>{cartProduct.name}</h3>
                <div>
                  Amount:{' '}
                  <span
                    data-test-id={`cart-product-quantity-${cartProduct.id}`}
                  >
                    {cartProduct.quantity}
                  </span>
                </div>
              </div>
              <h3>€ {cartProduct.totalPrice}</h3>
            </div>
          );
        })}
      </div>
      <div>
        <div>
          Total ({totalProducts}):{' '}
          <strong>
            € <span data-test-id="cart-total">{orderPrice}</span>
          </strong>
        </div>
      </div>
    </div>
  );
}
