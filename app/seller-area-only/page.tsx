import Link from 'next/link';

export const metadata = {
  title: 'Seller area',
  description: "Seller's area only",
};
export default function sellerAreaOnly() {
  return (
    <main className="flex-grow  w-full max-w-full px-20 py-12">
      <h1 className="mb-4 text-4xl text-center">Seller's area only. </h1>
      <p className=" text-center">
        Please log in to your seller account or{' '}
        <Link
          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
          href="/become-a-seller"
        >
          register{' '}
        </Link>
        for a seller account.
      </p>
    </main>
  );
}
