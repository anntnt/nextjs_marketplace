'use client';
import { expect, test } from '@jest/globals';
import { getCookie } from '../cookies';
import type { Cart } from '../createOrUpdateCartCookie';
import createOrUpdateCartCookie from '../createOrUpdateCartCookie';

test('Add to cart', async () => {
  const cart: Cart[] = [
    {
      id: 1,
      quantity: '4',
    },
    {
      id: 1,
      quantity: '10',
    },
    {
      id: 3,
      quantity: '6',
    },
  ];

  const addToEmptyCart = 'id: 1, quantity: 4';
  const addToNonEmptyCartWithTheSameId: Cart = {
    id: 1,
    quantity: '14',
  };
  const addToNonEmptyCartWithAnotherI: Cart = {
    id: 1,
    quantity: '14',
  };
  // console.log(cart[0]?.id, cart[0]?.quantity);
  if (cart[0]) {
    await createOrUpdateCartCookie(cart[0]?.id, cart[0]?.quantity);
    /*   .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.error('An error occurred:', error);
      });*/
  }

  expect(getCookie('cart')).toStrictEqual(addToEmptyCart);
  console.log(getCookie('cart'));
});
