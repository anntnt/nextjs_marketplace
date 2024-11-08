import { Card } from 'flowbite-react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import React from 'react';
import { getCategoryProductsInsecure } from '../../../database/products';

type Props = {
  params: Promise<{
    productCategoryId: string;
  }>;
};

export default async function SingleCategoryPage(props: Props) {
  const products = await getCategoryProductsInsecure(
    Number((await props.params).productCategoryId),
  );
  if (!products) {
    return notFound();
  }

  console.log('products', products);
  return (
    <div>
      <h1 className="mb-4 text-4xl text-center">Category</h1>
      <section className="bg-gray-50 py-8 antialiased dark:bg-gray-900 md:py-16">
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <div className="mb-4 flex items-center justify-between gap-4 md:mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
              Shop by category
            </h2>

            <a
              href="#"
              title=""
              className="flex items-center text-base font-medium text-primary-700 hover:underline dark:text-primary-500"
            >
              See more categories
              <svg
                className="ms-1 h-5 w-5"
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
                  d="M19 12H5m14 0-4 4m4-4-4-4"
                />
              </svg>
            </a>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {products.map((product) => {
              return (
                <div
                  key={`products-${product.id}`}
                  data-test-id={`product-id-${product.id}`}
                >
                  <Link
                    href={`/marketplace/${product.id}`}
                    className="flex items-center rounded-lg border border-gray-200 bg-white px-4 py-2 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
                  >
                    <Card
                      className="max-w-sm"
                      imgAlt={`Product ${product.name}`}
                      imgSrc={product.imageUrl}
                    >
                      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white self-center">
                        {product.name}
                      </h5>
                    </Card>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
