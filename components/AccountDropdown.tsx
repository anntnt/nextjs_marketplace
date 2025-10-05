'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getSafeReturnToPath } from '../util/validation';
import { useMemo, useState } from 'react';

export default function Component() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const currentPath = pathname && pathname !== '/login' && pathname !== '/register' ? pathname : '/';
  const loginHref = useMemo(() => {
    const sanitized = pathname && pathname !== '/login' ? pathname : undefined;
    const safe = getSafeReturnToPath(sanitized);
    return safe ? `/login?returnTo=${encodeURIComponent(safe)}` : '/login';
  }, [pathname]);

  const registerHref = useMemo(() => {
    if (!pathname || pathname === '/register') {
      return '/register';
    }
    return `/register?returnTo=${encodeURIComponent(currentPath)}`;
  }, [currentPath, pathname]);
  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        className="active:text-blue-1000 focus:text-blue-1000 font-semibold hidden md:flex text-black dark:text-white hover:text-blue-1000 border-0"
        type="button"
      >
        <svg
          className="w-6 h-6 text-gray-800 dark:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            fillRule="evenodd"
            d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4h-4Z"
            clipRule="evenodd"
          />
        </svg>
        Account
      </button>
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40 pointer-events-none bg-gradient-to-b from-transparent via-black/60 to-black/70 transition-opacity"
            aria-hidden
          />
          <div className="absolute left-1/2 top-full -translate-x-1/2 z-50 flex w-60 flex-col items-stretch">
            <span className="block h-4" aria-hidden />
            <div className="rounded-lg bg-gray-100 shadow-sm dark:bg-gray-700">
              <ul className="px-7 pb-7 pt-6 text-sm text-gray-700 dark:text-gray-200">
                <li>
                <Link
                  href={loginHref}
                    className="block w-36 rounded-lg px-4 py-2 mx-auto bg-yellow-100 dark:hover:bg-gray-600 dark:hover:text-white font-semibold text-black dark:text-white hover:text-blue-1000 active:text-blue-1000 focus:text-blue-1000 text-center border-0"
                  >
                    Login
                  </Link>
                </li>
                <li className="text-md text-center">
                  <hr className="mb-4" />
                  <div className=" text-black dark:text-white text-center ">
                    New to eStores?
                  </div>
                <Link
                  href={registerHref}
                    className="underline text-black dark:text-white hover:text-blue-1000 active:text-blue-1000 focus:text-blue-1000 font-semibold dark:hover:bg-gray-600 dark:hover:text-white text-center"
                  >
                    Register
                  </Link>{' '}
                  as a <strong>buyer</strong> or <strong>seller</strong> and start
                  exploring!
                </li>
              </ul>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
