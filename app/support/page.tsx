import SupportTopics from '../../components/SupportTopics';

export const metadata = {
  title: 'Support',
  description: 'Support',
};
export default function Page() {
  return (
    <main className="flex-grow w-full max-w-full bg-brand-bg px-5 py-12 text-brand-text transition-colors dark:bg-dark-bg dark:text-dark-text sm:px-20">
      <h1 className="text-4xl font-semibold text-center text-brand-text dark:text-dark-text">Support</h1>

      <section className="py-8 text-xl font-normal sm:px-16 xl:px-48">
        <div className="text-center text-sm text-[#F87171] dark:text-dark-muted">
          <p>*eStores is a demo project, not a real marketplace.</p>
        </div>
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <SupportTopics />
        </div>
      </section>
    </main>
  );
}
