import Link from 'next/link';

export const metadata = {
  title: 'Seller area',
  description: "Seller's area only",
};
export default function sellerAreaOnly() {
  return (
    <main className="flex-grow  w-full max-w-full px-20 py-12">
      <h1 className="mb-4 text-4xl text-center">Buyer's area only. </h1>
      <p className=" text-center">
        Please log in to your buyer account or log out and register for a buyer
        account.
      </p>
    </main>
  );
}
