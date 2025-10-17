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
    return safe ? `/login?returnTo=${safe}` : '/login';
  }, [pathname]);

  const registerHref = useMemo(() => {
    if (!pathname || pathname === '/register') {
      return '/register';
    }
    return `/register?returnTo=${currentPath}`;
  }, [currentPath, pathname]);
  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        className="cursor-pointer bg-brand-secondary group hidden items-center gap-2 border-0 font-semibold text-white transition-colors hover:text-brand-warning focus:text-brand-warning active:text-brand-warning dark:text-dark-text dark:hover:text-brand-warning dark:focus:text-brand-warning dark:active:text-brand-warning md:flex"
        type="button"
      >
        <svg
          className="h-6 w-6 text-white transition-colors group-hover:text-brand-warning group-focus:text-brand-warning group-active:text-brand-warning dark:text-brand-accent dark:group-hover:text-brand-warning dark:group-focus:text-brand-warning dark:group-active:text-brand-warning"
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
          <div className="absolute right-0 top-full z-50 flex w-60 translate-x-10 flex-col items-stretch">
            <span className="block h-4" aria-hidden />
            <div className="rounded-lg border border-brand-muted/20 bg-brand-surface shadow-xl dark:border-dark-muted/20 dark:bg-dark-surface">
              <ul className="px-7 pb-7 pt-6 text-sm text-brand-muted dark:text-dark-muted">
                <li>
                  <Link
                    href={loginHref as any}
                    className="mx-auto block w-36 rounded-lg border border-brand-primary bg-brand-primary px-4 py-2 text-center font-semibold text-white transition-colors hover:bg-brand-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary/70 active:bg-brand-secondary/90"
                  >
                    Login
                  </Link>
                </li>
                <li className="text-md text-center">
                  <hr className="mb-4" />
                  <div className="text-center text-brand-text dark:text-dark-text">
                    New to eStores?
                  </div>
                  <Link
                    href={registerHref as any}
                    className="text-center font-semibold text-brand-primary underline transition-colors hover:text-brand-secondary focus:text-brand-secondary active:text-brand-secondary dark:text-brand-primary"
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
