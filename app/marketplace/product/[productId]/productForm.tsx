'use client';

import { redirect, useRouter } from 'next/navigation';
import { useState } from 'react';
import type { User } from '../../../../migrations/0001-createTableUsers';
import type { CreateCartProductResponseBodyPost } from '../../../api/cart/route';
import ErrorMessage from '../../../ErrorMessage';

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
      <div className="mt-4 sm:items-center  sm:flex">
        <a
          href="#"
          title=""
          className="flex items-center justify-center py-2.5 px-5 text-sm font-medium text-gray-900  bg-white rounded-lg   dark:bg-gray-800 dark:text-gray-400 "
          role="button"
        >
          <svg
            className="w-5 h-5 -ms-2 me-2"
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
          Add to favorites
        </a>
      </div>
      <div className="mt-4 sm:items-center sm:gap-4 sm:flex">
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

            router.refresh();
          }}
        >
          <div className="flex items-center justify-between md:order-3 md:justify-end flex-wrap gap-4">
            <div className="flex items-center">
              <button
                type="button"
                className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 font-bold text-xl"
                onClick={() =>
                  quantity > 1 ? setQuantity(quantity - 1) : quantity
                }
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
                type="text"
                id="counter-input"
                data-input-counter
                className="w-10 shrink-0 border-0 bg-transparent text-center text-xl  text-gray-900 focus:outline-none focus:ring-0 dark:text-white font-bold"
                value={quantity}
                disabled
                data-test-id="product-quantity"
                required
              />

              <button
                type="button"
                className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 font-bold text-xl"
                onClick={() => setQuantity(quantity + 1)}
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
            <div className="text-end md:order-4  flex items-center justify-between  md:justify-end">
              <button
                className=" flex items-center justify-center py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-yellow-300 rounded-lg border border-gray-200 hover:bg-yellow-200 hover:text-black focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                type="submit"
              >
                <svg
                  className="w-5 h-5 -ms-2 me-2"
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
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
