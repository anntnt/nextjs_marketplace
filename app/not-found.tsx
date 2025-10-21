import Link from 'next/link';

export const metadata = {
  title: 'Not found',
  description: 'This page was not found',
};
export default function RootNotFound() {
  return (
    <main className="w-full max-w-full flex-grow bg-brand-bg text-brand-text transition-colors dark:bg-dark-bg dark:text-dark-text px-20 py-12">
      <div>
        Sorry this page was not found make sure you visit a page that exists
        <div>
          <Link href="/">Return Home</Link>
        </div>
      </div>
    </main>
  );
}
