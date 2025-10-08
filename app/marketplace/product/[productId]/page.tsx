import { cookies } from 'next/headers';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import React from 'react';
import { getCategoryProductWithSellerInsecure } from '../../../../database/products';
import { getUser } from '../../../../database/users';
import { formatEuroFromCents } from '../../../../util/price';
import ProductForm from './productForm';

type Props = {
  params: Promise<{
    productId: string;
  }>;
};

export default async function SingleProductPage(props: Props) {
  const productId = Number((await props.params).productId);
  // 1. Check if the sessionToken cookie exists
  const sessionTokenCookie = (cookies()).get('sessionToken');

  // 2. Query the current user with the sessionToken
  const user = sessionTokenCookie && (await getUser(sessionTokenCookie.value));

  const product = await getCategoryProductWithSellerInsecure(productId);
  if (!product) {
    return notFound();
  }

  return (
    <main className="bg-brand-bg  antialiased dark:bg-dark-bg flex-grow  w-full max-w-full px-5 sm:px-20 py-12">
      <section className="py-12 dark:bg-dark-bg antialiased">
        <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0">
          <div
            className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16"
            key={`products-${product.id}`}
            data-test-id={`product-id-${product.id}`}
          >
            <div className="shrink-0 max-w-md lg:max-w-lg mx-auto ">
              <Image
                className="w-full dark:hidden max-w-2xl rounded-lg border border-brand-border bg-brand-surface p-4 shadow-sm transition hover:border-brand-secondary hover:shadow-lg dark:border-dark-muted/60 dark:bg-dark-surface"
                alt={`Product ${product.name}`}
                src={product.imageUrl}
                width={500}
                height={375}
              />
            </div>

            <div className="mt-6 sm:mt-8 lg:mt-0">
              <h1 className="text-4xl font-semibold text-center text-brand-text dark:text-dark-text">
                {product.name}
              </h1>
              <div className="py-4 text-sm font-semibold sm:text-md text-brand-muted dark:text-dark-muted">
                <span className="text-brand-success">{product.storeName}</span>
              </div>
              <div className="mt-4 sm:items-center sm:gap-4 sm:flex">
                <p className="text-2xl font-extrabold text-brand-text sm:text-3xl dark:text-white">
                  {formatEuroFromCents(product.price)}
                </p>
              </div>
              {!user || user.roleId !== 2 ? (
                <ProductForm productId={productId} />
              ) : null}

              <hr className="my-6 md:my-8 border-brand-border dark:border-dark-muted/60" />

              <p className="mb-6 text-brand-muted dark:text-dark-muted">
                {product.description}
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
