export const metadata = {
  title: 'About',
  description: 'About',
};
export default function Page() {
  return (
    <main className="bg-gray-50  antialiased dark:bg-gray-900 flex-grow  w-full max-w-full px-5 sm:px-20 py-12">
      <h1 className="mb-4 text-4xl text-center">Contact me</h1>
      <section className="py-8 antialiased  md:py-16     text-xl  font-normal   sm:px-16 xl:px-48 dark:text-gray-400">
        <div className="mx-auto text-center max-w-screen-xl px-4 2xl:px-0">
          <p>
            Ann Tran{' '}
            <a
              className="text-blue-600 hover:underline"
              href="mailto:anntnt.wien@gmail.com"
            >
              anntnt.wien@gmail.com
            </a>
          </p>
        </div>
      </section>
    </main>
  );
}
