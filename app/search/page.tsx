import { cookies } from 'next/headers';
import { getUser } from '../../database/users';
import VirtuosoSearchGrid from './VirtuosoSearchGrid';

type Props = {
  searchParams: {
    query?: string;
  };
};

export default async function Page({ searchParams }: Props) {
  const query = searchParams?.query ?? '';

  const sessionTokenCookie = (await cookies()).get('sessionToken');
  const user = sessionTokenCookie && (await getUser(sessionTokenCookie.value));

  return (
    <main className="bg-gray-50 antialiased dark:bg-gray-900 px-4 sm:px-8 py-12">
      <h1 className="mb-4 text-4xl text-center">Your search for: "{query}"</h1>
      <section id="search-results" className="py-8 antialiased dark:bg-gray-900 md:py-12">
        <div className="mx-auto w-full max-w-screen-3xl px-0 sm:px-2 lg:px-4">
          <div className="mb-4 md:mb-8">
            {query ? (
              <VirtuosoSearchGrid
                query={query}
                userRoleId={user?.roleId}
                pageSize={30}
              />
            ) : (
              <div className="text-center text-xl text-gray-700 dark:text-gray-300">
                Please enter a search query.
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
