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
    <div className="flex items-center gap-4">
      <button
        type="button"
        className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 hover:underline dark:text-gray-400 dark:hover:text-white"
      >
        <svg
          className="me-1.5 h-5 w-5"
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
            d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"
          />
        </svg>
        Add to Favorites
      </button>

      <button
        type="button"
        className="inline-flex items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500"
      >
        <svg
          className="me-1.5 h-5 w-5"
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
            d="M6 18 17.94 6M18 18 6.06 6"
          />
        </svg>
        Remove
      </button>
      <ErrorMessage>{errorMessage}</ErrorMessage>
    </div>
  );
}
