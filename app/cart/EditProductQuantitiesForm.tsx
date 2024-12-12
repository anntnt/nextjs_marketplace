'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import type { CreateCartProductResponseBodyPost } from '../api/cart-items/route';
import ErrorMessage from '../ErrorMessage';

type Props = {
  productId: number;
  productQuantity: number;
};
export default function EditProductQuantitiesForm(props: Props) {
  const [quantity, setQuantity] = useState(props.productQuantity);

  const productId = props.productId;

  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  return (
    <div className=" flex items-center gap-3">
      <button
        onClick={async (event) => {
          event.preventDefault();

          let newQuantity;
          if (quantity > 1) {
            newQuantity = quantity - 1;
          } else {
            newQuantity = quantity;
          }

          setQuantity(newQuantity);

          const response = await fetch('/api/cart-items', {
            method: 'PUT',
            body: JSON.stringify({
              productId,
              quantity: newQuantity,
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

          router.refresh();
        }}
        type="button"
        className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 font-bold text-xl"
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
        className="w-12 shrink-0 border-0 bg-transparent text-center text-sm  text-gray-900 focus:outline-none focus:ring-0 dark:text-white "
        value={quantity}
        disabled
        data-test-id="product-quantity"
        required
      />
      <button
        onClick={async (event) => {
          event.preventDefault();

          const newQuantity = quantity + 1;
          setQuantity(newQuantity);
          const response = await fetch('/api/cart-items', {
            method: 'PUT',
            body: JSON.stringify({
              productId,
              quantity: newQuantity,
            }),
          });

          setErrorMessage('');

          if (!response.ok) {
            const responseBody: CreateCartProductResponseBodyPost =
              await response.json();

            if ('error' in responseBody) {
              setErrorMessage(responseBody.error);
              return;
            }
          }

          router.refresh();
        }}
        type="button"
        className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 font-bold text-xl"
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
      <ErrorMessage>{errorMessage}</ErrorMessage>
    </div>
  );
}
