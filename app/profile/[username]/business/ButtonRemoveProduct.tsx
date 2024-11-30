'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import type { Product } from '../../../../database/products';
import type { ProductResponseDelete } from '../../../api/products/[productId]/route';
import ErrorMessage from '../../../ErrorMessage';

type Props = { id: Product['id'] };

export default function ButtonRemoveForm(props: Props) {
  const [errorMessage, setErrorMessage] = useState('');

  const router = useRouter();

  return (
    <div
      role="button"
      tabIndex={0}
      className="bg-gray-50  antialiased dark:bg-gray-900 cursor-pointer"
      onClick={async () => {
        const response = await fetch(`/api/products/${props.id}`, {
          method: 'DELETE',
        });

        setErrorMessage('');

        if (!response.ok) {
          let newErrorMessage = 'Error deleting product';

          const responseBody: ProductResponseDelete = await response.json();

          if ('error' in responseBody) {
            newErrorMessage = responseBody.error;
          }

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
      aria-label="Delete product"
    >
      <svg
        className="w-[35px] h-[35px] text-gray-800 dark:text-white"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"
        />
      </svg>
      <ErrorMessage>{errorMessage}</ErrorMessage>
    </div>
  );
}
