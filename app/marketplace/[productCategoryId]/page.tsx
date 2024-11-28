import { Card } from 'flowbite-react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getCategoryNameInsecure } from '../../../database/productCategories';
import { getCategoryProductsInsecure } from '../../../database/products';
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

  if (!categoryNameObj) {
    return notFound();
  }

  return (
    <main className="bg-gray-50 py-8 antialiased dark:bg-gray-900 md:py-12">
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
          <div className="mb-4 grid gap-8 sm:grid-cols-2 md:mb-8 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => {
              return (
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
                  <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                    {product.name}
                  </h5>

                  <AddToCartForm product={product} />
                </Card>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
