import { expect, test } from '@jest/globals';
import { combineProductData } from '../productsFromCart';

test('Unit: Test function that combines the product data from the database with the product quantity data from your cookie', () => {
  const productsInDatabase = [
    {
      id: 2,
      name: 'Coconut',
      price: 7,
      image: 'coconut.jpg',
      description: 'Coconut',
    },
    {
      id: 3,
      name: 'Cashew',
      price: 3,
      image: 'Cashew.jpg',
      description: 'Cashew',
    },
    {
      id: 7,
      name: 'Mango',
      price: 3,
      image: 'mango.jpg',
      description: 'Mango',
    },
  ];
  const productsInCart = [
    {
      productId: 2,
      quantity: 4,
    },
    {
      productId: 7,
      quantity: 5,
    },
  ];

  const productData = [
    {
      id: 2,
      name: 'Coconut',
      image: 'coconut.jpg',
      price: 7,
      description: 'Coconut',
      quantity: 4,
      totalPrice: 28,
    },
    {
      id: 7,
      name: 'Mango',
      image: 'mango.jpg',
      price: 3,
      description: 'Mango',
      quantity: 5,
      totalPrice: 15,
    },
  ];

  expect(combineProductData(productsInDatabase, productsInCart)).toStrictEqual(
    productData,
  );
});
