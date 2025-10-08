export const metadata = {
  title: 'Seller area',
  description: "Seller's area only",
};
export default function sellerAreaOnly() {
  return (
    <main className="bg-brand-bg dark:bg-dark-bg flex-grow  w-full max-w-full px-5 sm:px-20 py-12">
      <h1 className="text-4xl font-semibold text-center text-brand-text dark:text-dark-text">Seller's area only. </h1>
      <p className=" text-center">
        Please log in to your seller account or log out and register for a
        seller account.
      </p>
    </main>
  );
}
