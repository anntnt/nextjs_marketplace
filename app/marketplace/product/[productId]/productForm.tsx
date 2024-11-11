'use client';

import { redirect, useRouter } from 'next/navigation';
import { useState } from 'react';
import type { User } from '../../../../migrations/0001-createTableUsers';
import type { CreateCartProductResponseBodyPost } from '../../../api/cart/route';
import ErrorMessage from '../../../ErrorMessage';

// import createOrUpdateCart from './action';

type Props = {
  productId: number;
};
export default function ProductForm(props: Props) {
  const [quantity, setQuantity] = useState(1);
  const [productId, setProductId] = useState(props.productId);

  const [userId, setUserId] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  return (
    <div>
      <form
        onSubmit={async (event) => {
          event.preventDefault();

          const response = await fetch('/api/cart', {
            method: 'POST',
            body: JSON.stringify({
              productId,
              quantity,
            }),
          });

          setErrorMessage('');

          if (!response.ok) {
            const responseBody: CreateCartProductResponseBodyPost =
              await response.json();

            if ('error' in responseBody) {
              // TODO: Use toast instead of showing
              // this below creation / update form
              setErrorMessage(responseBody.error);
              return;
            }
          }

          //router.refresh();
        }}
      >
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
        <button>Add to cart</button>
      </form>
    </div>
  );
}
