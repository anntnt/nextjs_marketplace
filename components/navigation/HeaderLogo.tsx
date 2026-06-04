import Image from 'next/image';
import Link from 'next/link';

export default function HeaderLogo() {
  return (
    <Link
      href="/"
      className="flex items-center text-xl font-semibold text-white transition-colors hover:text-brand-warning focus:text-brand-warning focus:outline-none dark:text-dark-text dark:hover:text-brand-warning dark:focus:text-brand-warning"
    >
      <Image
        src="/images/estores_logo.webp"
        width={559}
        height={102}
        className="h-auto w-32 pb-3 sm:pb-2 md:w-36 lg:w-40"
        alt="eStores logo"
        priority
      />
    </Link>
  );
}
