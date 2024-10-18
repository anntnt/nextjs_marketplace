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

  const testStrAddToEmptyCart = 'id: 1, quantity: 4';
  const testStrAddToNonEmptyCartWithTheSameId: Cart = {
    id: 1,
    quantity: '14',
  };
  const testStrAddToNonEmptyCartWithAnotherI: Cart = {
    id: 1,
    quantity: '14',
  };

  if (cart[0]) {
    await createOrUpdateCartCookie(cart[0]?.id, cart[0]?.quantity);
  }

  expect(getCookie('cart')).toStrictEqual(testStrAddToEmptyCart);
  console.log(getCookie('cart'));
});
