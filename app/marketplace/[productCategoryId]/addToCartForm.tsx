'use client';

import { redirect, useRouter } from 'next/navigation';
import { useState } from 'react';
import type { Product } from '../../../database/products';
import type { CreateCartProductResponseBodyPost } from '../../api/cart-items/route';
import ErrorMessage from '../../ErrorMessage';

type Props = {
  product: Product;
};
export default function AddToCartForm(props: Props) {
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  return (
    <div>
      <div className="mt-4 flex items-center justify-between gap-4">
        <p className="text-2xl font-extrabold leading-tight text-gray-900 dark:text-white">
          € {props.product.price}
        </p>
        <form
          onSubmit={async (event) => {
            event.preventDefault();

            const response = await fetch('/api/cart-items', {
              method: 'POST',
              body: JSON.stringify({
                productId: props.product.id,
                quantity: 1,
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
        >
          <button className="inline-flex items-center rounded-lg bg-blue-1000 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 hover:text-white focus:ring-4 focus:ring-blue-300dark:bg-primary-600 ">
            <svg
              className="-ms-2 me-2 h-5 w-5"
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
                d="M4 4h1.5L8 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm.75-3H7.5M11 7H6.312M17 4v6m-3-3h6"
              />
            </svg>
            Add to cart
          </button>
        </form>
      </div>
    </div>
  );
}
