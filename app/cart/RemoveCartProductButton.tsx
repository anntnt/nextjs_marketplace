'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import type { ProductFromCart } from '../../database/cartProducts';
import type { CartProductResponseDelete } from '../api/cart/[productId]/route';
import ErrorMessage from '../ErrorMessage';

type Props = {
  productId: ProductFromCart['id'];
};

export default function RemoveCartProductButton(props: Props) {
  const [errorMessage, setErrorMessage] = useState('');

  const router = useRouter();

  return (
    <div>
      <div
        role="button"
        tabIndex={0}
        className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md   focus:outline-none  text-sm pl-5 pt-3
        "
        onClick={async () => {
          const response = await fetch(`/api/cart/${props.productId}`, {
            method: 'DELETE',
          });

          setErrorMessage('');

          if (!response.ok) {
            let newErrorMessage = 'Error deleting product';

            const responseBody: CartProductResponseDelete =
              await response.json();

            if ('error' in responseBody) {
              newErrorMessage = responseBody.error;
            }

            // TODO: Use toast instead of showing
            // this below creation / update form
            setErrorMessage(newErrorMessage);
            return;
          }

          router.refresh();

          // Reset form states if deleting an
          // animal after editing it
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            // Trigger the same action on Enter or Space key press
            e.preventDefault(); // Prevent scrolling when pressing space
            // Trigger the click handler
            e.currentTarget.click();
          }
        }}
        aria-label="Delete cart product"
      >
        Delete
      </div>
      <ErrorMessage>{errorMessage}</ErrorMessage>
    </div>
  );
}
