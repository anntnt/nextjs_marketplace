export const metadata = {
  title: 'Seller area',
  description: "Seller's area only",
};
export default function sellerAreaOnly() {
  return (
    <main className="bg-gray-50 dark:bg-gray-900 flex-grow  w-full max-w-full px-5 sm:px-20 py-12">
      <h1 className="mb-4 text-4xl text-center">Seller's area only. </h1>
      <p className=" text-center">
        Please log in to your seller account or log out and register for a
        seller account.
      </p>
    </main>
  );
}
