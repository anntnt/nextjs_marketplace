import Image from 'next/image';
import Link from 'next/link';
import { FaLeaf, FaRocket, FaShieldHalved } from 'react-icons/fa6';
import { FaShippingFast } from 'react-icons/fa';
import CategoriesVirtuoso from '../components/CategoriesVirtuoso';

const categoryHighlights = [
  {
    title: 'Handpicked Brands',
    description: 'Curated collections from passionate sellers and boutique makers.',
    href: '/#categories',
    icon: <FaRocket className="h-6 w-6 text-blue-600" />,
  },
  {
    title: 'Eco-Friendly Picks',
    description: 'Discover sustainable alternatives for mindful shoppers.',
    href: '/#categories',
    icon: <FaLeaf className="h-6 w-6 text-emerald-600" />,
  },
  {
    title: 'Buyer Protection',
    description: 'Safe payments, verified sellers, and dedicated support.',
    href: '/support',
    icon: <FaShieldHalved className="h-6 w-6 text-purple-600" />,
  },
  {
    title: 'Fast Shipping',
    description: 'Express delivery options across the EU with live tracking.',
    href: '/#categories',
    icon: <FaShippingFast className="h-6 w-6 text-amber-500" />,
  },
];

export default function Home() {
  return (
    <main className="bg-gray-50 dark:bg-gray-900 flex-grow w-full max-w-full">
      {/* Categories */}
      <section
        id="categories"
        className="mb-16 pb-8 bg-gray-50 py-16 dark:bg-gray-900"
      >
        <div className="mx-auto w-full max-w-screen-3xl px-4 sm:px-8">
          <div className="mx-auto mt-8 mb-8 max-w-2xl text-center">
            <h1 className="text-3xl font-semibold text-gray-900 dark:text-white">
              Discover by category
            </h1>
            <p className="mt-3 text-gray-600 dark:text-gray-400">
              Everything in one place – shop collections that suit your lifestyle.
            </p>
          </div>
          <CategoriesVirtuoso />
        </div>
      </section>


      {/* Call to action */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-amber-200 via-white to-blue-200 dark:from-amber-900/60 dark:via-slate-900 dark:to-blue-900/60" />
        <div className="mx-auto w-full max-w-screen-3xl px-4 py-16 sm:px-8">
          <div className="grid gap-10 rounded-3xl bg-white/80 p-10 shadow-2xl shadow-amber-200/60 ring-white/60 backdrop-blur dark:bg-white/10 dark:shadow-blue-900/40 dark:ring-white/10 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="space-y-4">
              <h2 className="text-3xl font-semibold text-gray-900 dark:text-white">
                Ready to grow with eStores?
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Launch your storefront in minutes, access EU-wide shipping, and connect with shoppers who value quality.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/sell"
                  className="inline-flex items-center justify-center rounded-full bg-blue-600 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-blue-200 transition hover:-translate-y-0.5 hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:bg-blue-500 dark:shadow-blue-900/60 dark:hover:bg-blue-400"
                >
                  Launch your shop
                </Link>
              </div>
            </div>
            <div className="relative hidden h-full min-h-[260px] w-full overflow-hidden rounded-3xl lg:block">
              <Image
                src="/images/myproducts.jpg"
                alt="Seller dashboard preview"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-gray-900/60 via-gray-900/20 to-transparent" />
            </div>
          </div>
          <p className="mt-6 text-center text-sm text-red-600 dark:text-red-400">
            *eStores is a learning project and not a live marketplace.
          </p>
        </div>
      </section>
    </main>
  );
}
