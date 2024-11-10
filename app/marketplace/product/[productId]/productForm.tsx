'use client';

import { useState } from 'react';
import type { User } from '../../../../migrations/0001-createTableUsers';
import type { CreateCartProductResponseBodyPost } from '../../../api/cart/route';
import ErrorMessage from '../../../ErrorMessage';
// import createOrUpdateCart from './action';
import AddToCartButton from './addToCartButton';

type Props = {
  productId: number;
};
export default function ProductForm(props: Props) {
  const [quantity, setQuantity] = useState(1);
  const [productId, setProductId] = useState(props.productId);

  /* async function clickHandler(productId: number, amount: number) {
    await createOrUpdateCart(productId, amount);
    router.refresh();
  } */
  return (
    <div>
      <h3>Amount: {quantity}</h3>

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
      <AddToCartButton productId={productId} quantity={quantity} />
    </div>
  );
}
