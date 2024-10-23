'use client';

import { useState } from 'react';
import createOrUpdateCartCookie from './action';
import styles from './productForm.module.scss';

type Props = {
  productId: number;
};
export default function ProductForm(props: Props) {
  const [quantity, setQuantity] = useState(1);

  async function clickHandler(productId: number, amount: number) {
    await createOrUpdateCartCookie(productId, amount);
  }
  return (
    <div>
      <h3>Amount: {quantity}</h3>

      <form className={styles.singleProductForm}>
        <button
          type="button"
          onClick={() => (quantity > 1 ? setQuantity(quantity - 1) : quantity)}
        >
          -
        </button>
        <input value={quantity} disabled data-test-id="product-quantity" />

        <button type="button" onClick={() => setQuantity(quantity + 1)}>
          +
        </button>
        <button
          formAction={() => clickHandler(props.productId, quantity)}
          data-test-id="product-add-to-cart"
        >
          Add to cart
        </button>
      </form>
    </div>
  );
}
