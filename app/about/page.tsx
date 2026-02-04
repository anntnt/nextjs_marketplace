export const metadata = {
  title: 'Contact',
  description: 'Contact',
};
export default function Page() {
  return (
    <main className="flex-grow w-full max-w-full bg-brand-bg px-5 py-12 text-brand-text transition-colors dark:bg-dark-bg dark:text-dark-text sm:px-20 xl:px-48">
      <h1 className="text-4xl font-semibold text-center text-brand-text dark:text-dark-text">About</h1>
      <section className="py-8 text-xl font-normal sm:px-16 xl:px-48">
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <p>
            <strong className="text-brand-primary dark:text-brand-primary">eStores</strong> is a full-stack marketplace demo that showcases the core functionality of a buy-and-sell platform.
            It highlights technical skills in TypeScript, Next.js, React and PostgreSQL.
          </p>
          <p className="py-8 text-[#F87171] dark:text-[#F87171]">
          This is not a functional online marketplace and does not offer real products or services.
          </p>
          <p>
            All images come from Pexels and Pixabay, which provide free stock photos.
          </p>
        </div>
      </section>
    </main>
  );
}
