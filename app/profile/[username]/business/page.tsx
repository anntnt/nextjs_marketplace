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
  const sessionTokenCookie = (cookies()).get('sessionToken');

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
    <main className="flex-grow w-full max-w-full bg-brand-bg px-5 py-12 text-brand-text transition-colors dark:bg-dark-bg dark:text-dark-text md:px-20">
      <h1 className="text-4xl font-semibold text-center text-brand-text dark:text-dark-text">My Products</h1>
      <section className="py-8">
        <div className="mx-auto max-w-screen-md px-4 2xl:px-0">
          <Link
            href={`/profile/${user.username}/business/new-product`}
            className="inline-flex items-center gap-2 rounded-lg border border-brand-primary bg-brand-surface px-4 py-2 text-md font-medium text-brand-text transition-colors hover:border-brand-secondary hover:bg-brand-secondary/10 hover:text-brand-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary/70 dark:border-brand-primary dark:bg-dark-surface dark:text-dark-text"
          >
            <svg
              className="me-1.5 h-7 w-7 text-brand-primary"
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
        <div className="mx-auto max-w-screen-md space-y-6 px-4 2xl:px-0">
          <SellerProductsTable products={products} username={user.username} />

          <nav className="flex items-center justify-center gap-2 text-brand-muted dark:text-dark-muted">
            <Link
              href={hasPrevious ? makePageHref(page - 1) : '#'}
              aria-disabled={!hasPrevious}
              className={`rounded-md border px-3 py-2 text-sm font-medium transition-colors ${
                hasPrevious
                  ? 'border-brand-muted/30 text-brand-text hover:border-brand-primary hover:bg-brand-primary/10 hover:text-brand-primary dark:border-dark-muted/30 dark:text-dark-text dark:hover:border-brand-primary dark:hover:bg-brand-primary/10'
                  : 'cursor-not-allowed border-brand-muted/20 text-brand-muted dark:border-dark-muted/20 dark:text-dark-muted'
              }`}
            >
              Previous
            </Link>

            {paginationWindow.map((pageNumber) => (
              <Link
                key={`seller-products-page-${pageNumber}`}
                href={makePageHref(pageNumber)}
                className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  pageNumber === page
                    ? 'border border-brand-primary bg-brand-primary text-white'
                    : 'border border-brand-muted/30 text-brand-text hover:border-brand-primary hover:bg-brand-primary/10 hover:text-brand-primary dark:border-dark-muted/30 dark:text-dark-text dark:hover:border-brand-primary dark:hover:bg-brand-primary/10'
                }`}
              >
                {pageNumber}
              </Link>
            ))}

            <Link
              href={hasNext ? makePageHref(page + 1) : '#'}
              aria-disabled={!hasNext}
              className={`rounded-md border px-3 py-2 text-sm font-medium transition-colors ${
                hasNext
                  ? 'border-brand-muted/30 text-brand-text hover:border-brand-primary hover:bg-brand-primary/10 hover:text-brand-primary dark:border-dark-muted/30 dark:text-dark-text dark:hover:border-brand-primary dark:hover:bg-brand-primary/10'
                  : 'cursor-not-allowed border-brand-muted/20 text-brand-muted dark:border-dark-muted/20 dark:text-dark-muted'
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
