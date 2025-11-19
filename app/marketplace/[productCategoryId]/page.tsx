import { cookies } from 'next/headers';
import Link from 'next/link';
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

  const cookieStore = await cookies();
  const sessionTokenCookie = cookieStore.get('sessionToken');
  const user = sessionTokenCookie && (await getUser(sessionTokenCookie.value));

  if (!categoryNameObj) {
    return notFound();
  }

  return (
    <main className="w-full max-w-full flex-grow bg-brand-bg text-brand-text transition-colors dark:bg-dark-bg dark:text-dark-text px-4 sm:px-8 py-12">
      <div className="mb-6">
        <nav
          aria-label="Breadcrumb"
          className="text-sm text-brand-text dark:text-dark-text"
        >
          <ol className="flex flex-wrap items-center gap-2 justify-center sm:justify-start">
            <li>
              <Link
                href="/"
                className="transition text-brand-text hover:text-brand-primary dark:text-dark-text dark:hover:text-brand-secondary"
              >
                Alle Kategorien
              </Link>
            </li>
          </ol>
        </nav>
      </div>
      <h1 className="text-4xl font-semibold text-center text-brand-text dark:text-dark-text">
        {categoryNameObj.categoryName}
      </h1>
      <section id="category-products" className="py-8 antialiased">
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
