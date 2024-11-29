import { cookies } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getCartProducts } from '../../database/cartProducts';
import { getUser } from '../../database/users';
import { STANDARD_DELIVERY_PRICE } from '../../util/const';
import EditProductQuantitiesForm from './EditProductQuantitiesForm';
import RemoveCartProductButton from './RemoveCartProductButton';

export const metadata = {
  title: 'Cart',
  description: 'Cart page',
};

export default async function CartPage() {
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
  if (!productsFromCart.length) {
    return (
      <main className="flex-grow  w-full max-w-full px-20 py-12">
        <div className="mx-auto max-w-screen-xl sm:px-4 2xl:px-0">
          <h1 className="text-2xl font-extrabold text-gray-800">Your Cart </h1>

          <p>Your cart is empty</p>
        </div>
      </main>
    );
  }

  const subTotal = productsFromCart.reduce((accumulator, product) => {
    return (accumulator += product.price * product.quantity);
  }, 0);
  const total = subTotal + STANDARD_DELIVERY_PRICE;
  return (
    <main className="bg-gray-50  antialiased dark:bg-gray-900 flex-grow  w-full max-w-full px-2 sm:px-20 py-12">
      <div className="mx-auto max-w-screen-xl px-2 sm:px-6  2xl:px-0">
        <h1 className="text-2xl font-extrabold text-gray-800">Your Cart</h1>
        <div className="grid md:grid-cols-2 gap-4 mt-8">
          <div className=" space-y-4">
            {productsFromCart.map((product) => {
              return (
                <div
                  key={`product-${product.id}`}
                  data-test-id={`product-id-${product.id}`}
                  className="rounded-lg border border-gray-200 bg-white  shadow-sm dark:border-gray-700 dark:bg-gray-800 flex gap-4   "
                >
                  <div className="w-28 h-auto max-sm:w-24 max-sm:h-24 shrink-0 p-2  sm:p-4 md:p-6">
                    <Image
                      className="h-auto w-full max-h-full dark:hidden"
                      alt={`Product ${product.name}`}
                      src={product.imageUrl}
                      width={75}
                      height={56}
                    />
                    <Image
                      className="hidden h-auto w-full max-h-full dark:block"
                      alt={`Product ${product.name}`}
                      src={product.imageUrl}
                      width={75}
                      height={56}
                    />
                  </div>
                  <div className="flex flex-col gap-4">
                    <div>
                      <h3 className="text-base font-bold text-gray-800">
                        {product.name}
                      </h3>
                    </div>
                    <EditProductQuantitiesForm
                      productId={product.id}
                      productQuantity={product.quantity}
                      productPrice={product.price}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6bg-white  px-4 py-6 h-max ">
            <ul className="text-gray-800 space-y-4">
              <li className="flex flex-wrap gap-4 text-md">
                Subtotal <span className="ml-auto ">€ {subTotal}</span>
              </li>
              <li className="flex flex-wrap gap-4 text-md">
                Shipping{' '}
                <span className="ml-auto ">€ {STANDARD_DELIVERY_PRICE}</span>
              </li>
              <li>
                <hr className="border-gray-300" />
              </li>
              <li className="flex flex-wrap gap-4 text-md font-bold">
                Total <span className="ml-auto">€ {total}</span>
              </li>
            </ul>

            <div className="mt-8 space-y-2">
              <Link
                href="/checkout"
                type="button"
                className="text-center w-full text-white bg-blue-1000 hover:bg-blue-700 hover:text-white focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-md  px-5 py-2.5 me-2  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                Checkout
              </Link>
              <Link
                href="/marketplace"
                type="button"
                className="text-center text-sm px-4 py-2.5 w-full font-semibold tracking-wide bg-transparent hover:bg-gray-100 text-gray-800 border border-gray-300 rounded-md"
              >
                Continue Shopping{' '}
              </Link>
            </div>

            <div className="mt-4 flex flex-wrap justify-center gap-4">
              <img
                src="https://readymadeui.com/images/master.webp"
                alt="card1"
                className="w-10 object-contain"
              />
              <img
                src="https://readymadeui.com/images/visa.webp"
                alt="card2"
                className="w-10 object-contain"
              />
              <img
                src="https://readymadeui.com/images/american-express.webp"
                alt="card3"
                className="w-10 object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
