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
      <section className="bg-brand-warning py-24 text-white transition-colors sm:py-28">
        <div className="px-4 py-6 sm:px-8 sm:py-10">
          <div className="mx-auto w-full max-w-4xl">
            <div className="grid gap-10 rounded-3xl border border-brand-border/60 bg-brand-surface p-10 text-brand-text shadow-2xl shadow-black/30 backdrop-blur lg:grid-cols-[1.2fr_0.8fr] lg:overflow-hidden lg:p-0 dark:border-brand-border dark:bg-white dark:text-brand-text">
              <div className="space-y-4 lg:p-10">
                <h2 className="text-3xl font-semibold text-brand-text">
                  Ready to grow with eStores?
                </h2>
                <p className="text-brand-muted">
                  Launch your storefront in minutes, access EU-wide shipping, and connect with shoppers who value quality.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/sell"
                    className="inline-flex items-center justify-center rounded-full border border-[#1E293B] bg-[#06B6D4] px-6 py-3 text-base font-semibold text-[#1E293B] shadow-lg shadow-black/30 transition hover:-translate-y-0.5 hover:bg-[#0EA5E9] hover:text-[#1E293B] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:text-[#1E293B] active:translate-y-0"
                  >
                    Launch your shop
                  </Link>
                </div>
              </div>
              <div className="relative hidden h-full min-h-[260px] w-full overflow-hidden lg:block">
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
