import Link from 'next/link';

export default function Component() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-brand-secondary/40 bg-[#111827] text-white transition-colors dark:border-dark-muted/40 dark:bg-dark-surface dark:text-dark-text">
      <div className="flex w-full max-w-full flex-col items-center justify-between gap-4 py-4 px-4 text-sm text-white sm:px-10 xl:px-6 2xl:px-20 md:flex-row md:gap-0">
        <Link href="/" className="font-semibold text-white transition-colors hover:text-[#F59E0B] dark:text-dark-text dark:hover:text-brand-accent">
          © {year} eStores™
        </Link>
        <nav className="flex items-center gap-4 text-white">
          <Link href="/about" className="text-white transition-colors hover:text-[#F59E0B] dark:text-dark-text dark:hover:text-brand-accent">
            About
          </Link>
          <Link href="/support" className="text-white transition-colors hover:text-[#F59E0B] dark:text-dark-text dark:hover:text-brand-accent">
            Support
          </Link>
          <Link href="/contact" className="text-white transition-colors hover:text-[#F59E0B] dark:text-dark-text dark:hover:text-brand-accent">
            Contact
          </Link>
        </nav>
      </div>
    </footer>
  );
}
