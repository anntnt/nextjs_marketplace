import SupportTopics from '../../components/SupportTopics';

export const metadata = {
  title: 'Support',
  description: 'Support',
};
export default function Page() {
  return (
    <main className="bg-gray-50 dark:bg-gray-900 flex-grow  w-full max-w-full px-5 sm:px-20 py-12">
      <h1 className="mb-4 text-4xl text-center">Support</h1>

      <section className="py-8 antialiased  md:py-16 text-xl font-normal sm:px-16 xl:px-48 dark:text-gray-400">
        <div className="mt-6 text-center text-sm text-red-600 dark:text-red-400">
            *Portfolio project — not a real marketplace.
        </div>
        <div className="mx-auto  max-w-screen-xl px-4 2xl:px-0">
          <SupportTopics />
        </div>
      </section>
    </main>
  );
}
