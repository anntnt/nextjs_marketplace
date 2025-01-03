import { Card } from 'flowbite-react';
import { cookies } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { getCategoryNameInsecure } from '../../../database/productCategories';
import { getCategoryProductsInsecure } from '../../../database/products';
import { getUser } from '../../../database/users';
import AddToCartForm from './addToCartForm';

type Props = {
  params: Promise<{
    productCategoryId: string;
  }>;
};

export default async function SingleCategoryPage(props: Props) {
  const categoryId = Number((await props.params).productCategoryId);
  const categoryNameObj = await getCategoryNameInsecure(categoryId);
  const products = await getCategoryProductsInsecure(categoryId);

  // 1. Check if the sessionToken cookie exists
  const sessionTokenCookie = (await cookies()).get('sessionToken');

  // 2. Query the current user with the sessionToken
  const user = sessionTokenCookie && (await getUser(sessionTokenCookie.value));

  if (!categoryNameObj) {
    return notFound();
  }

  return (
    <main className="bg-gray-50  antialiased dark:bg-gray-900 px-5 sm:px-20 py-12">
      <h1 className="mb-4 text-4xl text-center">
        {categoryNameObj.categoryName}
      </h1>
      <section className=" py-8 antialiased dark:bg-gray-900 md:py-12">
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <div className="mb-4 flex items-center justify-between gap-4 md:mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
              Shop by category
            </h2>
          </div>

          {products.length === 0 ? (
            <div className="mb-4 grid gap-8  md:mb-8 ">
              <div className="mt-6 text-2xl text-center text-gray-900 dark:text-white">
                Our products are coming soon!
              </div>
            </div>
          ) : (
            <div className="mb-4 grid gap-8 sm:grid-cols-2 md:mb-8 lg:grid-cols-3 xl:grid-cols-4">
              {products.map((product) => (
                <Card
                  key={`products-${product.id}`}
                  data-test-id={`product-id-${product.id}`}
                  className="max-w-sm "
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
                  <Link
                    href={`/marketplace/product/${product.id}`}
                    className="hover:underline "
                  >
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
          )}
        </div>
      </section>
    </main>
  );
}
