'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { BsCart4 } from 'react-icons/bs';
import type { Product } from '../../database/products';
import type { CreateCartProductResponseBodyPost } from '../api/cart-items/route';
import ErrorMessage from '../ErrorMessage';
import { formatEuroFromCents } from '../../util/price';

// import type { Product } from '../../../database/products';
// import type { CreateCartProductResponseBodyPost } from '../../api/cart-items/route';
// import ErrorMessage from '../../ErrorMessage';

type Props = {
  product: Product;
};
export default function AddToCartForm(props: Props) {
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  return (
    <div className="mt-auto">
      <div className="mt-4 flex flex-col gap-3">
        <p className="text-2xl font-extrabold leading-tight text-gray-900 dark:text-white">
          {formatEuroFromCents(props.product.price)}
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
          <button className="inline-flex items-center gap-2 whitespace-nowrap rounded-lg bg-blue-1000 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 dark:bg-primary-600">
            <BsCart4 size={20} />
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
