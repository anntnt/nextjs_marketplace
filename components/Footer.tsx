import Link from 'next/link';

export default function Component() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto bg-gray-100">
      <div className="w-full max-w-full flex flex-col gap-4 md:flex-row md:gap-0 justify-between items-center py-4 px-4 sm:px-10 xl:px-6 2xl:px-20 text-sm text-gray-600">
        <Link href="/" className="hover:text-blue-1000 font-semibold text-gray-800">
          © {year} eStores™
        </Link>
        <nav className="flex items-center gap-4 text-gray-700">
          <Link href="/about" className="hover:text-blue-1000 transition-colors">
            About
          </Link>
          <Link href="/support" className="hover:text-blue-1000 transition-colors">
            Support
          </Link>
          <Link
            href="/privacy-policy"
            className="hover:text-blue-1000 transition-colors"
          >
            Privacy Policy
          </Link>
          <Link
            href="/terms-of-service"
            className="hover:text-blue-1000 transition-colors"
          >
            Terms of Service
          </Link>
          <Link href="/contact" className="hover:text-blue-1000 transition-colors">
            Contact
          </Link>
        </nav>
      </div>
    </footer>
  );
}
