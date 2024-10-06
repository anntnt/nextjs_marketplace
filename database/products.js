// import 'server-only';

const products = [
  {
    id: 1,
    name: 'Cashew nuts',
    price: 6,
    image: 'cashew-nuts.jpg',
  },
  {
    id: 2,
    name: 'Lychee',
    price: 10,
    image: 'lychee.jpg',
  },
  {
    id: 3,
    name: 'Mango',
    price: 13,
    image: 'mango.jpg',
  },
  {
    id: 4,
    name: 'Coconut',
    price: 7,
    image: 'coconut.jpg',
  },
  {
    id: 5,
    name: 'Dried Pineapple',
    price: 6,
    image: 'dried-pineapple.jpg',
  },
  {
    id: 6,
    name: 'Instant noodles',
    price: 7,
    image: 'instant-noodles.jpg',
  },
];

export function getProducts() {
  return products;
}
export function getProduct(id) {
  return products.find((product) => product.id === id);
}
