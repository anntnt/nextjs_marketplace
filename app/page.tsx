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
    icon: <FaRocket className="h-6 w-6 text-brand-primary" />,
  },
  {
    title: 'Eco-Friendly Picks',
    description: 'Discover sustainable alternatives for mindful shoppers.',
    href: '/#categories',
    icon: <FaLeaf className="h-6 w-6 text-brand-secondary" />,
  },
  {
    title: 'Buyer Protection',
    description: 'Safe payments, verified sellers, and dedicated support.',
    href: '/support',
    icon: <FaShieldHalved className="h-6 w-6 text-brand-accent" />,
  },
  {
    title: 'Fast Shipping',
    description: 'Express delivery options across the EU with live tracking.',
    href: '/#categories',
    icon: <FaShippingFast className="h-6 w-6 text-brand-primary" />,
  },
];

export default function Home() {
  return (
    <main className="w-full max-w-full flex-grow bg-brand-bg text-brand-text transition-colors dark:bg-dark-bg dark:text-dark-text">
      {/* Categories */}
      <section
        id="categories"
        className="mb-16 bg-brand-surface py-12 pb-8 dark:bg-dark-surface"
      >
        <div className="mx-auto w-full max-w-screen-3xl px-4 sm:px-8">
          <div className="mx-auto mb-8 max-w-3xl text-center">
            <h1 className="text-4xl font-semibold text-center text-brand-text dark:text-dark-text">
            Your world. Organized for you.
            </h1>
            <p className="mt-3 text-brand-muted dark:text-dark-muted">
            Discover collections that fit your lifestyle — simple, inspiring, and made for everyday living.
            </p>
          </div>
          <CategoriesVirtuoso />
        </div>
      </section>


      {/* Call to action */}
      <section className="bg-gradient-to-r from-[#F59E0B] via-[#FCDFAF] to-[#A7F3D0] py-24 text-brand-text transition-colors sm:py-28 lg:py-32">
        <div className="px-0 py-8 sm:px-0 sm:py-12 lg:px-16 lg:py-14">
          <div className="mx-auto w-full max-w-5xl">
            <div className="grid  rounded-3xl text-brand-text sm:rounded-[2.5rem] sm:p-0 md:bg-gradient-to-r md:from-[#F59E0B] md:via-[#FCDFAF] md:to-[#A7F3D0] md:p-8 lg:grid-cols-[1.1fr_0.9fr] lg:overflow-hidden lg:border lg:border-brand-border/60 lg:bg-brand-surface lg:bg-none lg:p-0 dark:border-brand-border dark:bg-white dark:text-brand-text">
              <div className="space-y-6 px-6 py-8 sm:px-6 sm:py-10 md:px-6 md:py-10 lg:px-0 lg:py-14 lg:pl-16 lg:pr-14">
                <h2 className="text-3xl font-semibold text-brand-text">
                  Ready to grow with eStores?
                </h2>
                <p className="text-brand-muted">
                  Launch your storefront in minutes, access EU-wide shipping, and connect with shoppers who value quality.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/sell"
                    className="inline-flex items-center justify-center rounded-full border border-brand-secondary bg-brand-secondary px-6 py-3 text-base font-semibold text-white shadow-lg shadow-black/30 transition hover:-translate-y-0.5 hover:bg-[#024c61] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 active:translate-y-0"
                  >
                    Launch your shop
                  </Link>
                </div>
              </div>
              <div className="relative order-first h-72 w-full overflow-hidden sm:h-80 sm:rounded-3xl lg:order-none lg:h-full lg:rounded-none">
                <Image
                  src="/images/smiling_woman.jpg"
                  alt="Seller dashboard preview"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-brand-secondary/70 via-brand-secondary/10 to-transparent" />
              </div>
            </div>
            <p className="mt-6 text-center text-sm text-white/90">
              *eStores is a portfolio project and not a real marketplace.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
