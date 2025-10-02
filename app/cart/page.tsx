import { cookies } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import {
  createOrUpdateCartItem,
  getCartProducts,
  type ProductFromCart,
} from '../../database/cartProducts';
import { getProductsByIds } from '../../database/products';
import { getUser } from '../../database/users';
import { STANDARD_DELIVERY_PRICE } from '../../util/const';
import { parseGuestCartCookie } from '../../util/guestCart';
import { formatEuroFromCents } from '../../util/price';
import EditProductQuantitiesForm from './EditProductQuantitiesForm';
import RemoveCartProductButton from './RemoveCartProductButton';

export const metadata = {
  title: 'Cart',
  description: 'Cart page',
};

export default async function CartPage() {
  const cookieStore = cookies();
  const sessionTokenCookie = cookieStore.get('sessionToken');
  let guestCartItems = parseGuestCartCookie(cookieStore.get('guestCart')?.value);

  const sessionToken = sessionTokenCookie?.value;
  const user = sessionToken ? await getUser(sessionToken) : undefined;

  if (user && user.roleId !== 3) {
    redirect('/buyer-area-only');
  }

  if (user?.roleId === 3 && sessionToken && guestCartItems.length > 0) {
    for (const item of guestCartItems) {
      await createOrUpdateCartItem(sessionToken, item.productId, item.quantity);
    }

    cookieStore.delete('guestCart');
    guestCartItems = [];
  }

  let productsFromCart: ProductFromCart[] = [];
  const isGuest = !user;

  if (!isGuest && sessionToken) {
    const productsRaw = await getCartProducts(sessionToken);
    productsFromCart = productsRaw.map((product) => ({
      ...product,
      price: Number(product.price),
    }));
  } else {
    const quantityById = new Map(
      guestCartItems.map((item) => [item.productId, item.quantity]),
    );
    const orderById = new Map(
      guestCartItems.map((item, index) => [item.productId, index]),
    );

    const products = await getProductsByIds([...quantityById.keys()]);

    productsFromCart = products
      .map((product) => ({
        id: product.id,
        name: product.name,
        price: product.price,
        imageUrl: product.imageUrl,
        quantity: quantityById.get(product.id) ?? 0,
      }))
      .filter((product) => product.quantity > 0)
      .sort(
        (a, b) => (orderById.get(a.id) ?? 0) - (orderById.get(b.id) ?? 0),
      );
  }

  if (!productsFromCart.length) {
    return (
      <main className="flex-grow  w-full max-w-full px-5 sm:px-20 py-12">
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <h1 className="mb-4 text-3xl text-center">Your Cart</h1>

          <p>Your cart is empty</p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="/#categories"
              className="text-center sm:w-auto rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-semibold text-gray-800 hover:bg-gray-100"
            >
              Continue shopping
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const subTotal = productsFromCart.reduce((accumulator, product) => {
    return accumulator + product.price * product.quantity;
  }, 0);
  const total = subTotal + STANDARD_DELIVERY_PRICE;
  const checkoutHref = !isGuest
    ? '/checkout'
    : '/login?returnTo=%2Fcheckout';

  return (
    <main className="bg-gray-50  antialiased dark:bg-gray-900 flex-grow  w-full max-w-full px-5 sm:px-20 py-12">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <h1 className="mb-4 text-3xl text-center">Your Cart</h1>
        <div className="grid sm:grid-cols-2 gap-4 mt-8 py-8">
          <div className="md:col-span-2 space-y-4">
            {productsFromCart.map((product) => {
              return (
                <div
                  key={`product-${product.id}`}
                  data-test-id={`product-id-${product.id}`}
                  className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6 flex gap-4  px-4 py-6 "
                >
                  <div className="flex gap-4">
                    <div className="w-28 h-auto max-sm:w-24 max-sm:h-24 shrink-0">
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
                        <h2 className="text-base font-bold text-gray-800">
                          {product.name}
                        </h2>
                      </div>
                      <EditProductQuantitiesForm
                        productId={product.id}
                        productQuantity={product.quantity}
                      />
                    </div>
                  </div>

                  <div className="ml-auto flex flex-col">
                    <div className="flex items-start gap-4 justify-end">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 cursor-pointer fill-gray-400 inline-block"
                        viewBox="0 0 64 64"
                      >
                        <path
                          d="M45.5 4A18.53 18.53 0 0 0 32 9.86 18.5 18.5 0 0 0 0 22.5C0 40.92 29.71 59 31 59.71a2 2 0 0 0 2.06 0C34.29 59 64 40.92 64 22.5A18.52 18.52 0 0 0 45.5 4ZM32 55.64C26.83 52.34 4 36.92 4 22.5a14.5 14.5 0 0 1 26.36-8.33 2 2 0 0 0 3.27 0A14.5 14.5 0 0 1 60 22.5c0 14.41-22.83 29.83-28 33.14Z"
                          data-original="#000000"
                        />
                      </svg>

                      <RemoveCartProductButton productId={product.id} />
                    </div>
                    <p className="text-md font-bold text-gray-800 mt-5">
                      {formatEuroFromCents(product.price)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6bg-white  px-4 py-6 h-max ">
            <ul className="text-gray-800 space-y-4">
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
                <hr className="border-gray-300" />
              </li>
              <li className="flex flex-wrap gap-4 text-md font-bold">
                Total
                <span className="ml-auto ">{formatEuroFromCents(total)}</span>
              </li>
            </ul>

            <div className="mt-8 space-y-2">
              <Link
                href={checkoutHref}
                type="button"
                className="text-center w-full text-white bg-blue-1000 hover:bg-blue-700 hover:text-white focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-md  px-5 py-2.5 me-2  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                Checkout
              </Link>
              <Link
                href="/#categories"
                type="button"
                className="text-center text-sm px-4 py-2.5 w-full font-semibold tracking-wide bg-transparent hover:bg-gray-100 text-gray-800 border border-gray-300 rounded-md"
              >
                Continue shopping
              </Link>
            </div>

            {isGuest ? (
              <p className="mt-4 text-sm text-gray-500">
                You can add products without signing in. We will ask you to log in
                or create an account before checkout so we can save your order.
              </p>
            ) : null}

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
