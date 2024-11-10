'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import createOrUpdateCartCookie from './action';

type Props = {
  productId: number;
};
export default function ProductForm(props: Props) {
  const [quantity, setQuantity] = useState(1);
  const router = useRouter();

  async function clickHandler(productId: number, amount: number) {
    await createOrUpdateCartCookie(productId, amount);
    router.refresh();
  }
  return (
    <div>
      <h3>Amount: {quantity}</h3>

      <form>
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
