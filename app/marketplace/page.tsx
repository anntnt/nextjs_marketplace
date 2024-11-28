import { Card } from 'flowbite-react';
import Image from 'next/image';
import Link from 'next/link';
import { getProductCategoriesInsecure } from '../../database/productCategories';

export const metadata = {
  title: 'Marketplace',
  description: 'Marketplace',
};
export default async function Page() {
  const productCategories = await getProductCategoriesInsecure();
  return (
    <main className="bg-gray-50 dark:bg-gray-900 flex-grow  w-full max-w-full px-5 sm:px-20 py-12">
      <h1 className="mb-4 text-4xl text-center">Marketplace</h1>
      <section className="py-8 antialiased  md:py-16">
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <div className="mb-4 flex items-center justify-between gap-4 md:mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
              Shop by category
            </h2>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {productCategories.map((productCategory) => {
              return (
                <Card
                  key={`products-${productCategory.id}`}
                  data-test-id={`product-id-${productCategory.id}`}
                  className="max-w-sm"
                  renderImage={() => (
                    <Link href={`/marketplace/${productCategory.id}`}>
                      <Image
                        width={500}
                        height={500}
                        src={productCategory.imageUrl}
                        alt={`Product ${productCategory.categoryName}`}
                      />
                    </Link>
                  )}
                >
                  <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                    {productCategory.categoryName}
                  </h5>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
