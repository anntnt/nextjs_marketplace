'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { BsCart4 } from 'react-icons/bs';
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
                setErrorMessage(responseBody.error);
                return;
              }
            }

            router.refresh();
          }}
        >
          <button className="inline-flex items-center rounded-lg bg-blue-1000 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 hover:text-white focus:ring-4 focus:ring-blue-300dark:bg-primary-600 ">
            <BsCart4 size={20} className="mr-3 mb-1" />
            Add to cart
          </button>
        </form>
      </div>
      <div>
        <ErrorMessage>{errorMessage}</ErrorMessage>
      </div>
    </div>
  );
}
