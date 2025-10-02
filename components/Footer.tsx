export default function Component() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto bg-gray-100">
      <div className="w-full max-w-full flex flex-col gap-4 md:flex-row md:gap-0 justify-between items-center py-4 px-4 sm:px-10 xl:px-6 2xl:px-20 text-sm text-gray-600">
        <a href="/" className="hover:text-blue-1000 font-semibold text-gray-800">
          © {year} eStores™
        </a>
        <nav className="flex items-center gap-4 text-gray-700">
          <a
            href="/privacy-policy"
            className="hover:text-blue-1000 transition-colors"
          >
            Privacy Policy
          </a>
          <a
            href="/terms-of-service"
            className="hover:text-blue-1000 transition-colors"
          >
            Terms of Service
          </a>
          <a href="/contact" className="hover:text-blue-1000 transition-colors">
            Contact
          </a>
        </nav>
      </div>
    </footer>
  );
}
