import { Card } from 'flowbite-react';
import Link from 'next/link';
import { getProductCategoriesInsecure } from '../../database/productCategories';

export const metadata = {
  title: 'Marketplace',
  description: 'Marketplace',
};
export default async function Page() {
  const productCategories = await getProductCategoriesInsecure();
  return (
    <main className="flex-grow  w-full max-w-full px-20 py-12">
      <h1 className="mb-4 text-4xl text-center">Marketplace</h1>
      <section className="bg-gray-50 py-8 antialiased dark:bg-gray-900 md:py-16">
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <div className="mb-4 flex items-center justify-between gap-4 md:mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
              Shop by category
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {productCategories.map((productCategory) => {
              return (
                <div
                  key={`productCategories-${productCategory.id}`}
                  data-test-id={`productCategory-id-${productCategory.id}`}
                >
                  <Link
                    href={`/marketplace/${productCategory.id}`}
                    className="flex items-center rounded-lg border border-gray-200 bg-white px-4 py-2 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
                  >
                    <Card
                      className="max-w-sm"
                      imgAlt={`Category ${productCategory.categoryName}`}
                      imgSrc={productCategory.imageUrl}
                    >
                      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white self-center">
                        {productCategory.categoryName}
                      </h5>
                    </Card>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
