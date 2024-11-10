'use server';
import { redirect } from 'next/navigation';
import { useState } from 'react';
import { getUser } from '../../../../database/users';
import type { User } from '../../../../migrations/0001-createTableUsers';
import { getCookie } from '../../../../util/cookies';
import type { CreateCartProductResponseBodyPost } from '../../../api/cart/route';
import ErrorMessage from '../../../ErrorMessage';
import createOrUpdateCart from './action';

type Props = {
  productId: number;
  quantity: number;
};
export default async function AddToCartButton(props: Props) {
  const productId = props.productId;
  const quantity = props.quantity;

  const sessionTokenCookie = await getCookie('sessionToken');

  // 2. Query user with the sessionToken
  const user = sessionTokenCookie && (await getUser(sessionTokenCookie));

  // 3. If the user does not exist, redirect to the login with the returnTo query parameter
  if (!user) {
    redirect(`/login?returnTo=/marketplace/product/${productId}`);
  }
  const userId = user.id;

  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault();

        const response = await fetch('/api/cart', {
          method: 'POST',
          body: JSON.stringify({
            productId,
            quantity,
            userId,
          }),
        });

        let errorMessage = '';

        if (!response.ok) {
          const responseBody: CreateCartProductResponseBodyPost =
            await response.json();

          if ('error' in responseBody) {
            // TODO: Use toast instead of showing
            // this below creation / update form
            errorMessage = responseBody.error;
            return;
          }
        }
      }}
    >
      <button>Add to cart</button>
    </form>
  );
}
