export const metadata = {
  title: 'Contact',
  description: 'Contact eStores',
};

export default function Page() {
  return (
    <main className="bg-gray-50 dark:bg-gray-900 flex-grow w-full max-w-full px-5 sm:px-20 py-12">
      <h1 className="mb-4 text-4xl text-center">Contact</h1>

      <section className="py-8 antialiased md:py-16 text-lg sm:px-16 xl:px-48 dark:text-gray-400">
        <div className="max-w-2xl mx-auto">
          <p className="mb-8 text-left">
            Hi, I'm <span className="font-semibold">Ann Tran</span>, a full-stack web developer.<br />   
            Have a question about this project or just want to connect?
          </p>

          <ul className="text-base text-left space-y-1 leading-tight">
            <li>
              📧 Email:{' '}
              <a
                href="mailto:anntnt.wien@gmail.com"
                className="text-blue-600 hover:underline dark:text-blue-400"
              >
                anntnt.wien@gmail.com
              </a>
            </li>

            <li>
              💻 GitHub:{' '}
              <a
                href="https://github.com/anntnt/nextjs_marketplace"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline dark:text-blue-400"
              >
                github.com/anntnt/nextjs_marketplace
              </a>
            </li>
          </ul>


          <div className="mt-10 text-sm text-red-600 dark:text-red-400 text-left">
            *Portfolio project — not a real marketplace.
          </div>
        </div>
      </section>
    </main>
  );
}
