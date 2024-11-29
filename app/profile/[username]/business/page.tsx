import { Tooltip } from 'flowbite-react';
import { cookies } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getProductsOfSeller } from '../../../../database/products';
import { getUser } from '../../../../database/users';
import ButtonRemoveProduct from './ButtonRemoveProduct';

export default async function SellerProductsPage() {
  // const { username } = await props.params;

  // Task: Add redirect to login page if user is not logged in
  // 1. Check if the sessionToken cookie exists
  // 2. Query the current user with the sessionToken
  // 3. If user doesn't exist, redirect to login page
  // 4. If user exists, render the page

  // 1. Check if the sessionToken cookie exists
  const sessionTokenCookie = (await cookies()).get('sessionToken');

  // 2. Query the current user with the sessionToken
  const user = sessionTokenCookie && (await getUser(sessionTokenCookie.value));

  // 3. If user doesn't exist, redirect to login page
  if (!user) {
    redirect('/login');
  }
  if (user.roleId !== 2) {
    redirect('/seller-area-only');
  }

  const products = await getProductsOfSeller(sessionTokenCookie.value);

  return (
    <main className="flex-grow  w-full max-w-full md:px-20 py-12">
      <h1 className="mb-4 text-4xl text-center">My Products</h1>
      <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
        <div className="mx-auto max-w-screen-md px-4 2xl:px-0">
          <Link
            href={`/profile/${user.username}/business/new-product`}
            className=" border-blue-1000 inline-flex items-center px-4 py-2 text-md font-medium text-gray-900 bg-white border border-bue-1000 rounded-lg hover:bg-gray-100 hover:text-yellow-300 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
          >
            <svg
              className="w-7 h-7 me-1.5 text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 5v14m-8-7h2m0 0h2m-2 0v2m0-2v-2m12 1h-6m6 4h-6M4 19h16c.5523 0 1-.4477 1-1V6c0-.55228-.4477-1-1-1H4c-.55228 0-1 .44772-1 1v12c0 .5523.44772 1 1 1Z"
              />
            </svg>
            Add new product
          </Link>
        </div>
        <div className="mx-auto max-w-screen-md px-4 2xl:px-0">
          <div className="mx-auto max-w-3xl">
            <div className="mt-6 sm:mt-8">
              <div className="relative overflow-x-auto border-b border-gray-200 dark:border-gray-800">
                <table className="w-full text-left font-medium text-gray-900 dark:text-white md:table-fixed">
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                    {products.map((product) => {
                      const productId = String(product.id);
                      return (
                        <tr
                          key={`products-${product.id}`}
                          data-test-id={`seller-product-id-${product.id}`}
                        >
                          <td className="whitespace-nowrap py-2 md:w-[384px]">
                            <div className="flex items-center gap-4">
                              <div className="flex items-center aspect-square w-75 h-32 shrink-0">
                                <Image
                                  className="h-auto w-4/5 sm:w-full max-h-full dark:hidden"
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
                              {product.name}
                            </div>
                          </td>

                          <td className="p-2 text-base font-normal text-gray-900 dark:text-white">
                            € {product.price}
                          </td>
                          <td className="p-2 text-base font-normal text-gray-900 dark:text-white">
                            <Link
                              prefetch={true}
                              href={{
                                pathname: `/profile/${user.username}/business/edit-product`,
                                query: { productId: productId }, // Ensure the ID is a string
                              }}
                            >
                              <Tooltip content="Edit product">
                                <svg
                                  className="w-[35px] h-[35px] text-gray-800 dark:text-white"
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  fill="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    fill-rule="evenodd"
                                    d="M11.32 6.176H5c-1.105 0-2 .949-2 2.118v10.588C3 20.052 3.895 21 5 21h11c1.105 0 2-.948 2-2.118v-7.75l-3.914 4.144A2.46 2.46 0 0 1 12.81 16l-2.681.568c-1.75.37-3.292-1.263-2.942-3.115l.536-2.839c.097-.512.335-.983.684-1.352l2.914-3.086Z"
                                    clip-rule="evenodd"
                                  />
                                  <path
                                    fill-rule="evenodd"
                                    d="M19.846 4.318a2.148 2.148 0 0 0-.437-.692 2.014 2.014 0 0 0-.654-.463 1.92 1.92 0 0 0-1.544 0 2.014 2.014 0 0 0-.654.463l-.546.578 2.852 3.02.546-.579a2.14 2.14 0 0 0 .437-.692 2.244 2.244 0 0 0 0-1.635ZM17.45 8.721 14.597 5.7 9.82 10.76a.54.54 0 0 0-.137.27l-.536 2.84c-.07.37.239.696.588.622l2.682-.567a.492.492 0 0 0 .255-.145l4.778-5.06Z"
                                    clip-rule="evenodd"
                                  />
                                </svg>
                              </Tooltip>
                            </Link>
                          </td>

                          <td className="p-2 text-right text-base font-bold text-gray-900 dark:text-white">
                            <Tooltip content="Remove product">
                              <ButtonRemoveProduct id={product.id} />
                            </Tooltip>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
