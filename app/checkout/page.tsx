import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import React from 'react';
import { getCartProducts } from '../../database/cartProducts';
import { getUser } from '../../database/users';
import { STANDARD_DELIVERY_PRICE } from '../../util/const';
import { formatEuroFromCents } from '../../util/price';
import PaymentCheckComponent from './PaymentCheckComponent';

export const metadata = {
  title: 'Checkout',
  description: 'Checkout page',
};

export default async function CheckoutPage() {
  // 1. Check if the sessionToken cookie exists
  const sessionTokenCookie = (await cookies()).get('sessionToken');

  // 2. Query the current user with the sessionToken
  const user = sessionTokenCookie && (await getUser(sessionTokenCookie.value));

  // 3. If user doesn't exist, redirect to login page
  if (!user) {
    redirect('/login');
  }

  if (user.roleId !== 3) {
    redirect('/buyer-area-only');
  }
  const productsFromCart = await getCartProducts(sessionTokenCookie.value);

  const subTotal = productsFromCart.reduce((accumulator, product) => {
    return (accumulator += product.price * product.quantity);
  }, 0);
  const total = subTotal + STANDARD_DELIVERY_PRICE;
  return (
    <main className="w-full max-w-full flex-grow bg-brand-bg text-brand-text transition-colors dark:bg-dark-bg dark:text-dark-text antialiased px-5 sm:px-20 py-12">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <h1 className="text-4xl font-semibold text-center text-brand-text dark:text-dark-text">Checkout</h1>
        <div className="grid sm:grid-cols-2 gap-4 mt-8 py-8">
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 space-y-4">
              <div className="text-xl font-semibold text-brand-text dark:text-white">
                Delivering to {user.firstname} {user.lastname}
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>{user.address}</div>
              </div>
            </div>
            <br />

            <PaymentCheckComponent />
          </div>

          <div>
            <ul className="space-y-4 rounded-lg border border-brand-border bg-brand-surface px-4 py-6 text-brand-text shadow-sm dark:border-dark-muted/60 dark:bg-dark-surface sm:p-6">
              <li className="flex flex-wrap gap-4 text-md">
                Subtotal
                <span className="ml-auto ">{formatEuroFromCents(subTotal)}</span>
              </li>
              <li className="flex flex-wrap gap-4 text-md">
                Shipping{' '}
                <span className="ml-auto ">
                  {formatEuroFromCents(STANDARD_DELIVERY_PRICE)}
                </span>
              </li>
              <li>
                <hr className="border-brand-border/60 dark:border-dark-muted/40" />
              </li>

              <li className="flex flex-wrap gap-4 text-md font-bold">
                Total
                <span className="ml-auto ">{formatEuroFromCents(total)}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
