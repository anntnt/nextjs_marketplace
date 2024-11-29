'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import type { CreateCartProductResponseBodyPost } from '../api/cart-items/route';
import ErrorMessage from '../ErrorMessage';

type Props = {
  productId: number;
  productQuantity: number;
  productPrice: number;
};
export default function EditProductQuantitiesForm(props: Props) {
  const [quantity, setQuantity] = useState(props.productQuantity);

  const productId = props.productId;
  const productPrice = props.productPrice;

  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  return (
    <div className="flex items-center justify-between md:order-3 md:justify-end">
      <div className="flex items-center">
        <button
          type="button"
          id="decrement-button"
          data-input-counter-decrement="counter-input"
          className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
        >
          <svg
            className="h-2.5 w-2.5 text-gray-900 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 18 2"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 1h16"
            />
          </svg>
        </button>
        <input
          id="counter-input"
          data-input-counter
          className="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0 dark:text-white"
          placeholder=""
          value="2"
          required
        />
        <button
          type="button"
          id="increment-button"
          data-input-counter-increment="counter-input"
          className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
        >
          <svg
            className="h-2.5 w-2.5 text-gray-900 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 18 18"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 1v16M1 9h16"
            />
          </svg>
        </button>
      </div>

      <div className="text-end md:order-4 md:w-32">
        <p className="text-base font-bold text-gray-900 dark:text-white">
          ${productPrice}
        </p>
      </div>
    </div>
  );
}
