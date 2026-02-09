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
        <p className="text-2xl font-extrabold leading-tight text-brand-text dark:text-dark-text">
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
          <button className="inline-flex items-center gap-2 whitespace-nowrap rounded-lg border border-brand-primary bg-brand-primary px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary/70 active:bg-brand-secondary/90">
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
