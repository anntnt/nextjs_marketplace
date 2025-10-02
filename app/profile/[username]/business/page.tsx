import { cookies } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getProductsOfSeller } from '../../../../database/products';
import { getUser } from '../../../../database/users';
import SellerProductsTable from './SellerProductsTable';

type Props = {
  searchParams: Promise<{
    page?: string | string[];
  }>;
};

export default async function SellerProductsPage({ searchParams }: Props) {
  // 1. Check if the sessionToken cookie exists
  const sessionTokenCookie = (await cookies()).get('sessionToken');

  // 2. Query the current user with the sessionToken
  const user = sessionTokenCookie && (await getUser(sessionTokenCookie.value));

  // 3. If user doesn't exist, redirect to login page
  if (!user) {
    redirect('/login');
  }
  if (user.roleId !== 2) {
    redirect('/seller-area-only');
  }

  const resolvedSearchParams = await searchParams;
  const pageParamRaw = Array.isArray(resolvedSearchParams.page)
    ? resolvedSearchParams.page[0]
    : resolvedSearchParams.page;
  const requestedPage = Number(pageParamRaw);
  const page = Number.isFinite(requestedPage) && requestedPage > 0
    ? Math.floor(requestedPage)
    : 1;
  const pageSize = 25;

  const { products, totalCount } = await getProductsOfSeller(
    sessionTokenCookie.value,
    page,
    pageSize,
  );

  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));

  if (page > totalPages && totalCount > 0) {
    const target = totalPages === 1
      ? `/profile/${user.username}/business`
      : `/profile/${user.username}/business?page=${totalPages}`;
    redirect(target);
  }

  const baseHref = `/profile/${user.username}/business`;
  const makePageHref = (targetPage: number) =>
    targetPage <= 1 ? { pathname: baseHref } : { pathname: baseHref, query: { page: targetPage } };

  const hasPrevious = page > 1;
  const hasNext = page < totalPages;
  const paginationWindow = [page - 1, page, page + 1]
    .filter((p) => p >= 1 && p <= totalPages)
    .filter((value, index, self) => self.indexOf(value) === index);

  return (
    <main className="flex-grow  w-full max-w-full md:px-20 py-12">
      <h1 className="mb-4 text-4xl text-center">My Products</h1>
      <section className=" py-8 antialiased dark:bg-gray-900 md:py-16">
        <div className="mx-auto max-w-screen-md px-4 2xl:px-0">
          <Link
            href={`/profile/${user.username}/business/new-product`}
            className=" border-blue-1000 inline-flex items-center px-4 py-2 text-md font-medium text-gray-900 bg-white border border-bue-1000 rounded-lg hover:bg-gray-100 hover:text-yellow-300 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
          >
            <svg
              className="w-7 h-7 me-1.5 text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 5v14m-8-7h2m0 0h2m-2 0v2m0-2v-2m12 1h-6m6 4h-6M4 19h16c.5523 0 1-.4477 1-1V6c0-.55228-.4477-1-1-1H4c-.55228 0-1 .44772-1 1v12c0 .5523.44772 1 1 1Z"
              />
            </svg>
            Add new product
          </Link>
        </div>
        <div className="mx-auto max-w-screen-md px-4 2xl:px-0 space-y-6">
          <SellerProductsTable products={products} username={user.username} />

          <nav className="flex items-center justify-center gap-2">
            <Link
              href={hasPrevious ? makePageHref(page - 1) : '#'}
              aria-disabled={!hasPrevious}
              className={`rounded-md border px-3 py-2 text-sm font-medium ${
                hasPrevious
                  ? 'text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700'
                  : 'cursor-not-allowed text-gray-400 dark:text-gray-600'
              }`}
            >
              Previous
            </Link>

            {paginationWindow.map((pageNumber) => (
              <Link
                key={`seller-products-page-${pageNumber}`}
                href={makePageHref(pageNumber)}
                className={`rounded-md px-3 py-2 text-sm font-medium ${
                  pageNumber === page
                    ? 'bg-blue-1000 text-white'
                    : 'text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {pageNumber}
              </Link>
            ))}

            <Link
              href={hasNext ? makePageHref(page + 1) : '#'}
              aria-disabled={!hasNext}
              className={`rounded-md border px-3 py-2 text-sm font-medium ${
                hasNext
                  ? 'text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700'
                  : 'cursor-not-allowed text-gray-400 dark:text-gray-600'
              }`}
            >
              Next
            </Link>
          </nav>
        </div>
      </section>
    </main>
  );
}
