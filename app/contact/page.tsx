export const metadata = {
  title: 'Contact',
  description: 'Contact eStores',
};

export default function Page() {
  return (
    <main className="flex-grow w-full max-w-full bg-brand-bg px-5 py-12 text-brand-text transition-colors dark:bg-dark-bg dark:text-dark-text sm:px-20">
      <div className="mx-auto w-full max-w-2xl px-4 sm:px-6">
        <h1 className="text-4xl font-semibold text-center text-brand-text dark:text-dark-text">Contact</h1>

        <section className="py-8 text-lg">
          <p className="mb-8 text-left">
            Hi, I'm <span className="font-semibold text-brand-primary dark:text-brand-primary">Ann Tran</span>, a full-stack web developer.<br />
            Have a question about this project or just want to connect?
          </p>

          <ul className="mt-6 space-y-1 text-left text-base leading-tight">
            <li>
              📧 Email:{' '}
              <a
                href="mailto:anntnt.wien@gmail.com"
                className="text-brand-primary underline-offset-2 transition-colors hover:text-brand-secondary hover:underline dark:text-brand-primary"
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
                className="text-brand-primary underline-offset-2 transition-colors hover:text-brand-secondary hover:underline dark:text-brand-primary"
              >
                github.com/anntnt/nextjs_marketplace
              </a>
            </li>
          </ul>


          <div className="mt-10 text-left text-sm text-brand-muted dark:text-dark-muted">
            *Portfolio project — not a real marketplace.
          </div>
        </section>
      </div>
    </main>
  );
}
