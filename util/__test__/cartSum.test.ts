import { expect, test } from '@jest/globals';
import { calculateCartItems } from '../itemsFromCart';

test('reduce animal favorite foods', () => {
  const productQuantityInCart1 = [{ productId: 1, quantity: 1 }];

  const productQuantityInCart2 = [
    { productId: 1, quantity: 8 },
    { productId: 3, quantity: 32 },
  ];
  const productQuantityInCart3 = [
    { productId: 1, quantity: 108 },
    { productId: 3, quantity: 33 },
    { productId: 4, quantity: 6 },
  ];
  expect(calculateCartItems(productQuantityInCart1)).toBe(1);
  expect(calculateCartItems(productQuantityInCart2)).toBe(40);
  expect(calculateCartItems(productQuantityInCart3)).toBe(147);
});
