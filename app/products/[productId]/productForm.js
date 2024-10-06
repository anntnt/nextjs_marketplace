'use client';

import { useState } from 'react';
import createOrUpdateCartCookie from './action';
import styles from './productForm.scss';

export default function productForm(props) {
  const [quantity, setQuantity] = useState('1');
  return (
    <div>
      <h3>Amount: {quantity}</h3>
      <form className={styles.singleProductForm}>
        <select
          value={quantity}
          data-test-id="product-quantity"
          onChange={(event) => setQuantity(event.currentTarget.value)}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>

        <button
          formAction={() => createOrUpdateCartCookie(props.productId, quantity)}
        >
          Add to cart
        </button>
      </form>
    </div>
  );
}
