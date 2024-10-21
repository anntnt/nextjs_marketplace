import { expect, test } from '@jest/globals';
import { add } from '../math';

test('Unit: Test function for updating quantity in item of cookie (eg. adding an item to the cart that already exists), by adding 2 numbers', () => {
  expect(add(1, 1)).toBe(2);
  expect(add(100, 200)).toBe(300);
});

test('throws an error when arguments are not numbers', () => {
  // @ts-expect-error Test for invalid parameter type
  expect(() => add(1, '1')).toThrow('Pass only numbers!');
  // @ts-expect-error Test for invalid parameter type
  expect(() => add(false, '1')).toThrow('Pass only numbers!');
  // @ts-expect-error Test for invalid parameter type
  expect(() => add('2', '1')).toThrow('Pass only numbers!');
});
