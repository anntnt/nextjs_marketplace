'use client';

import Link from 'next/link';
import { useCallback, useMemo, useRef } from 'react';
import { FiHelpCircle } from 'react-icons/fi';
import { usePathname } from 'next/navigation';
import type { User } from '../../migrations/0001-createTableUsers';
import Cart from '../features/Cart';
import AccountDropdown from './AccountDropdown';
import ProfileDropdown from './ProfileDropdown';
import { getSellerRegistrationHref } from '../../lib/navigation/links';

type Props = {
  user: User | undefined;
  cartSum?: string;
  showCart: boolean;
  isSeller: boolean;
};

export default function HeaderDesktopActions({
  user,
  cartSum,
  showCart,
  isSeller,
}: Props) {
  const accountDropdownRef = useRef<HTMLDivElement>(null);
  const profileDropdownRef = useRef<HTMLDivElement>(null);

  const pathname = usePathname();

  const sellerRegisterHref = useMemo(
    () => getSellerRegistrationHref(pathname),
    [pathname],
  );

  const focusFirstInDropdown = useCallback(
    (getRoot: () => HTMLElement | null | undefined) => {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          const root = getRoot();
          if (!root) return;

          const preferred = root.querySelector<HTMLElement>(
            'a[href="/login"], a[href^="/login"], [data-first-focus], button[data-action="login"]',
          );

          const firstTabbable =
            preferred ||
            root.querySelector<HTMLElement>(
              'a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])',
            );

          firstTabbable?.focus();
        });
      });
    },
    [],
  );

  const handleAccountDropdownOpenChange = useCallback(
    (open: boolean) => {
      if (open) {
        focusFirstInDropdown(() => accountDropdownRef.current);
      }
    },
    [focusFirstInDropdown],
  );

  const handleProfileDropdownOpenChange = useCallback(
    (open: boolean) => {
      if (open) {
        focusFirstInDropdown(() => profileDropdownRef.current);
      }
    },
    [focusFirstInDropdown],
  );

  return (
    <>
      <Link
        href="/support"
        className="hidden items-center gap-1 font-semibold text-white transition-colors hover:text-brand-warning focus:text-brand-warning active:text-brand-warning dark:text-dark-text dark:hover:text-brand-warning dark:focus:text-brand-warning dark:active:text-brand-warning md:inline-flex"
      >
        <FiHelpCircle className="h-4 w-4" aria-hidden="true" />
        Help
      </Link>

      {!isSeller ? (
        <Link
          href={sellerRegisterHref}
          className="hidden rounded-full border border-brand-warning bg-brand-warning px-4 py-2 text-sm font-semibold text-white shadow-sm transition-transform hover:-translate-y-0.5 hover:bg-white hover:text-brand-warning focus:bg-white focus:text-brand-warning focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/60 active:translate-y-0 md:inline-flex"
        >
          Open your shop
        </Link>
      ) : null}

      {user && isSeller ? (
        <Link
          href={`/profile/${user.username}/business`}
          className="hidden rounded-full border border-brand-warning bg-brand-warning px-4 py-2 text-sm font-semibold text-white shadow-sm transition-transform hover:-translate-y-0.5 hover:bg-white hover:text-brand-warning focus:bg-white focus:text-brand-warning focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/60 active:translate-y-0 md:inline-flex"
        >
          My Products
        </Link>
      ) : null}

      {user ? (
        <>
          <div className="hidden md:mr-10 md:block" ref={profileDropdownRef}>
            <ProfileDropdown
              user={user}
              onOpenChange={handleProfileDropdownOpenChange}
            />
          </div>

          {showCart ? <Cart cartSum={cartSum} /> : null}
        </>
      ) : (
        <>
          <div className="relative hidden md:inline-flex">
            <div ref={accountDropdownRef}>
              <AccountDropdown onOpenChange={handleAccountDropdownOpenChange} />
            </div>
          </div>

          {showCart ? <Cart cartSum={cartSum} /> : null}
        </>
      )}
    </>
  );
}
