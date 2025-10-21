export const metadata = {
  title: 'Seller area',
  description: "Seller's area only",
};
export default function sellerAreaOnly() {
  return (
    <main className="w-full max-w-full flex-grow bg-brand-bg text-brand-text transition-colors dark:bg-dark-bg dark:text-dark-text antialiased px-5 sm:px-20 py-12">
      <h1 className="text-4xl font-semibold text-center text-brand-text dark:text-dark-text">Buyer's area only. </h1>
      <p className=" text-center">
        Please log in to your buyer account or log out and register for a buyer
        account.
      </p>
    </main>
  );
}
