import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import { getCategoryNameInsecure } from '../../../database/productCategories';
import { getUser } from '../../../database/users';
import VirtuosoProductGrid from './VirtuosoProductGrid';

type Props = {
  params: Promise<{
    productCategoryId: string;
  }>;
};

async function SingleCategoryClientPage(props: Props) {
  const categoryId = Number((await props.params).productCategoryId);
  const categoryNameObj = await getCategoryNameInsecure(categoryId);

  const sessionTokenCookie = (await cookies()).get('sessionToken');
  const user = sessionTokenCookie && (await getUser(sessionTokenCookie.value));

  if (!categoryNameObj) {
    return notFound();
  }

  return (
    <main className="bg-gray-50 dark:bg-gray-900 flex-grow w-full max-w-full px-4 sm:px-8 py-12">
      <h1 className="mb-4 text-4xl text-center">
        {categoryNameObj.categoryName}
      </h1>
      <section id="category-products" className="py-8 antialiased md:py-16">
        <div className="mx-auto w-full max-w-screen-3xl px-0 sm:px-2 lg:px-4">
          <div className="mb-4 md:mb-8">
            <VirtuosoProductGrid
              categoryId={categoryId}
              userRoleId={user?.roleId}
              pageSize={30}
            />
          </div>
        </div>
      </section>
    </main>
  );
}

export default SingleCategoryClientPage;
