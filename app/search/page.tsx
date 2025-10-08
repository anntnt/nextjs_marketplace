import VirtuosoSearchGrid from './VirtuosoSearchGrid';

type Props = {
  searchParams: {
    query?: string;
  };
};

export default async function Page({ searchParams }: Props) {
  const query = searchParams.query ?? '';

  return (
    <main className="bg-brand-bg antialiased dark:bg-dark-bg px-4 sm:px-8 py-12">
      <h1 className="text-4xl font-semibold text-center text-brand-text dark:text-dark-text">Your search for: "{query}"</h1>
      <section id="search-results" className="py-8 antialiased dark:bg-dark-bg md:py-12">
        <div className="mx-auto w-full max-w-screen-3xl px-0 sm:px-2 lg:px-4">
          <div className="mb-4 md:mb-8">
            {query ? (
              <VirtuosoSearchGrid query={query} pageSize={30} />
            ) : (
              <div className="text-center text-xl text-brand-muted dark:text-dark-muted">
                Please enter a search query.
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
