'use client';

import Image from 'next/image';
import { redirect, useRouter } from 'next/navigation';
import { useState } from 'react';
import type { ProductFromCart } from '../../database/cartProducts';
import type { CartProductResponseDelete } from '../api/cart/route';

type Props = {
  productId: Number;
};

export default function RemoveCartProductButton(props: Props) {
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  return (
    <button
      className="bg-white"
      onClick={async () => {
        const response = await fetch(`/api/products/${props.productId}`, {
          method: 'DELETE',
        });

        setErrorMessage('');

        if (!response.ok) {
          let newErrorMessage = 'Error deleting product';

          const responseBody: CartProductResponseDelete = await response.json();

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
        //resetFormStates();
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-4 cursor-pointer fill-gray-400 inline-block"
        viewBox="0 0 24 24"
      >
        <path
          d="M19 7a1 1 0 0 0-1 1v11.191A1.92 1.92 0 0 1 15.99 21H8.01A1.92 1.92 0 0 1 6 19.191V8a1 1 0 0 0-2 0v11.191A3.918 3.918 0 0 0 8.01 23h7.98A3.918 3.918 0 0 0 20 19.191V8a1 1 0 0 0-1-1Zm1-3h-4V2a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v2H4a1 1 0 0 0 0 2h16a1 1 0 0 0 0-2ZM10 4V3h4v1Z"
          data-original="#000000"
        ></path>
        <path
          d="M11 17v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Zm4 0v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Z"
          data-original="#000000"
        ></path>
      </svg>
    </button>
  );
}
