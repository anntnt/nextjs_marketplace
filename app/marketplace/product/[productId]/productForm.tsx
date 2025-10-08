'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { BsCart4 } from 'react-icons/bs';
import type { CreateCartProductResponseBodyPost } from '../../../api/cart-items/route';
import ErrorMessage from '../../../ErrorMessage';

type Props = {
  productId: number;
};
export default function ProductForm(props: Props) {
  const [quantity, setQuantity] = useState(1);
  const [errorMessage, setErrorMessage] = useState('');
  const productId = props.productId;
  const router = useRouter();

  return (
    <div>
      <div className="mt-4 sm:items-center  sm:flex">
        <Link
          href="/"
          title=""
          className="flex items-center justify-center rounded-lg border border-brand-border bg-brand-surface px-5 py-2.5 text-sm font-medium text-brand-text transition-colors hover:border-brand-primary hover:bg-brand-primary/10 hover:text-brand-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/50 dark:border-dark-muted/60 dark:bg-dark-surface dark:text-dark-text"
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
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"
            />
          </svg>
          Add to favorites
        </Link>
      </div>
      <div className="mt-4 sm:items-center sm:gap-4 sm:flex">
        <form
          onSubmit={async (event) => {
            event.preventDefault();

            const response = await fetch('/api/cart-items', {
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
                className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-brand-border bg-brand-surface font-bold text-xl text-brand-text transition-colors hover:border-brand-primary hover:bg-brand-primary/10 focus:outline-none focus:ring-2 focus:ring-brand-primary/30 dark:border-dark-muted/60 dark:bg-dark-surface dark:text-white dark:hover:border-brand-primary dark:hover:bg-brand-primary/20 dark:focus:ring-brand-primary/40"
                onClick={() =>
                  quantity > 1 ? setQuantity(quantity - 1) : quantity
                }
              >
                <svg
                  className="h-2.5 w-2.5 text-brand-text dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 2"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 1h16"
                  />
                </svg>
              </button>
              <input
                id="counter-input"
                data-input-counter
                className="w-10 shrink-0 border-0 bg-transparent text-center text-xl font-bold text-brand-text focus:outline-none focus:ring-0 dark:text-white"
                value={quantity}
                disabled
                data-test-id="product-quantity"
                required
              />

              <button
                type="button"
                className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-brand-border bg-brand-surface font-bold text-xl text-brand-text transition-colors hover:border-brand-primary hover:bg-brand-primary/10 focus:outline-none focus:ring-2 focus:ring-brand-primary/30 dark:border-dark-muted/60 dark:bg-dark-surface dark:text-white dark:hover:border-brand-primary dark:hover:bg-brand-primary/20 dark:focus:ring-brand-primary/40"
                onClick={() => setQuantity(quantity + 1)}
              >
                <svg
                  className="h-2.5 w-2.5 text-brand-text dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 18"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 1v16M1 9h16"
                  />
                </svg>
              </button>
            </div>
            <div className="text-end md:order-4  flex items-center justify-between  md:justify-end">
              <button className="inline-flex items-center rounded-lg border border-brand-primary bg-brand-primary px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary/70">
                <BsCart4 size={20} className="mr-3 mb-1" />
                Add to cart
              </button>
            </div>
          </div>
        </form>
      </div>

      <div className="mb-5">
        <ErrorMessage>{errorMessage}</ErrorMessage>
      </div>
    </div>
  );
}
