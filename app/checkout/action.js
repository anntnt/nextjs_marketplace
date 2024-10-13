'use server';
import { deleteCookie } from '../../util/cookies';

export default async function emptyCart() {
  await deleteCookie('cart');
}
