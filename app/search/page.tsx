import { Card } from 'flowbite-react';
import { cookies } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getSearchProductsInsecure } from '../../database/searchProducts';
import { getUser } from '../../database/users';
import AddToCartForm from './addToCartForm';

type Props = {
  searchParams: Promise<{
    query: string;
  }>;
};

export default async function Page(props: Props) {
  const query = String((await props.searchParams).query);

  const products =
    query && query !== 'undefined' && (await getSearchProductsInsecure(query));

  // 1. Check if the sessionToken cookie exists
  const sessionTokenCookie = (await cookies()).get('sessionToken');

  // 2. Query the current user with the sessionToken
  const user = sessionTokenCookie && (await getUser(sessionTokenCookie.value));

  if (!products) {
    return notFound();
  }

  return (
    <>
      {query && query !== 'undefined' && products.length === 0 ? (
        <main className="bg-gray-50  antialiased dark:bg-gray-900 px-5 sm:px-20 py-12">
          <h1 className="mb-4 text-4xl text-center">
            Your search for: "{query}"
          </h1>
          <section className=" py-8 antialiased dark:bg-gray-900 md:py-12">
            <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
              <div className="mb-4 grid gap-8  md:mb-8 ">
                <div className="mt-6 text-2xl text-center text-gray-900 dark:text-white">
                  Unfortunately, your search for "{query}" didn’t return any
                  results. Try again with a different term
                </div>
              </div>
            </div>
          </section>
        </main>
      ) : (
        <main className="bg-gray-50  antialiased dark:bg-gray-900 px-5 sm:px-20 py-12">
          <h1 className="mb-4 text-4xl text-center">
            Your search for: "{query}"
          </h1>
          <section className=" py-8 antialiased dark:bg-gray-900 md:py-12">
            <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
              <div className="mb-4 grid gap-8 sm:grid-cols-2 md:mb-8 lg:grid-cols-3 xl:grid-cols-4">
                {products.map((product) => (
                  <Card
                    key={`products-${product.id}`}
                    data-test-id={`product-id-${product.id}`}
                    className="max-w-sm"
                    renderImage={() => (
                      <Link href={`/marketplace/product/${product.id}`}>
                        <Image
                          width={500}
                          height={500}
                          src={product.imageUrl}
                          alt={`Product ${product.name}`}
                        />
                      </Link>
                    )}
                  >
                    <Link href={`/marketplace/product/${product.id}`}>
                      <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                        {product.name}
                      </h5>
                    </Link>

                    {!user || user.roleId !== 2 ? (
                      <AddToCartForm product={product} />
                    ) : null}
                  </Card>
                ))}
              </div>
            </div>
          </section>
        </main>
      )}
    </>
  );
}
