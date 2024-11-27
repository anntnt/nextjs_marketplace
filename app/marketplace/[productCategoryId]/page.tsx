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
          <div className="mb-4 grid gap-4 sm:grid-cols-2 md:mb-8 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => {
              return (
                <div
                  className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800"
                  key={`products-${product.id}`}
                  data-test-id={`product-id-${product.id}`}
                >
                  <div className="h-56 w-full">
                    <Link href={`/marketplace/product/${product.id}`}>
                      <Image
                        className="mx-auto "
                        alt={`Product ${product.name}`}
                        src={product.imageUrl}
                        width={500}
                        height={0}
                        style={{ height: '224px', width: 'auto' }}
                      />
                    </Link>
                  </div>
                  <div className="pt-10 mt-5">
                    <Link
                      href={`/marketplace/product/${product.id}`}
                      className="text-lg font-semibold leading-tight text-gray-900 hover:underline dark:text-white"
                    >
                      {product.name}
                    </Link>
                  </div>

                  <AddToCartForm product={product} />
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
