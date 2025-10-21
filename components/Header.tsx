'use client';

import Image from 'next/image';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import type { PropsWithChildren } from 'react';
import type FocusTrap from 'focus-trap-react';
import { createElement, useCallback, useEffect, useRef, useState } from 'react';
import { FiHelpCircle } from 'react-icons/fi';
import LogoutButton from '../app/(auth)/logout/LogoutButton';
import type { AccountDropdownProps } from './AccountDropdown';
import type { User } from '../migrations/0001-createTableUsers';

type FocusTrapProps = PropsWithChildren<{ focusTrapOptions?: any; active?: boolean }>;

// FocusTrap dynamic import
const focusTrapDynamic = dynamic<FocusTrapProps>(() => import('focus-trap-react'), {
  ssr: false,
});

function FocusTrapWrapper(props: FocusTrapProps) {
  return createElement(focusTrapDynamic, props);
}

type UserWithUsernameAndRole = User & {
  username: string;
  role: string;
};

type UserProps = {
  user: User | UserWithUsernameAndRole | undefined;
  cartSum?: string;
};

type SearchProps = { placeholder: string; className?: string };
const searchComponent = dynamic<SearchProps>(
  () => import('./Search'),
  { ssr: false, loading: () => null }
);

function Search(props: SearchProps) {
  return createElement(searchComponent, props);
}

type CartProps = { cartSum?: string };
const cartComponent = dynamic<CartProps>(() => import('./Cart'), {
  ssr: false,
  loading: () => null,
});
function Cart(props: CartProps) {
  return createElement(cartComponent, props);
}

type ProfileDropdownProps = { user: User | UserWithUsernameAndRole | undefined };
const profileDropdownComponent = dynamic<ProfileDropdownProps>(
  () => import('./ProfileDropdown'),
  { ssr: false, loading: () => null }
);
function ProfileDropdown(props: ProfileDropdownProps) {
  return createElement(profileDropdownComponent, props);
}

const accountDropdownDynamic = dynamic<AccountDropdownProps>(() => import('./AccountDropdown'), {
  ssr: false,
  loading: () => null,
});

function AccountDropdown(props: AccountDropdownProps) {
  return createElement(accountDropdownDynamic, props);
}

export default function Header(props: UserProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => setIsOpen((previous) => !previous);
  const closeMenu = () => setIsOpen(false);
  const showCart = !props.user || props.user.roleId === 3;

  // Disable body scroll when mobile menu open
  useEffect(() => {
    if (!isOpen) {
      document.body.style.removeProperty('overflow');
      return;
    }
    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (previousOverflow) {
        document.body.style.overflow = previousOverflow;
      } else {
        document.body.style.removeProperty('overflow');
      }
    };
  }, [isOpen]);

  // Close menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Focus first element inside AccountDropdown (prefer Login)
  const focusFirstInDropdown = useCallback(() => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const root = dropdownRef.current;
        if (!root) return;

        // Prefer Login or custom data-first-focus element
        const preferred =
          root.querySelector<HTMLElement>(
            'a[href="/login"], a[href^="/login"], [data-first-focus], button[data-action="login"]'
          );

        // Fallback to first tabbable item
        const firstTabbable =
          preferred ||
          root.querySelector<HTMLElement>(
            'a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );

        firstTabbable?.focus();
      });
    });
  }, []);

  const handleAccountDropdownOpenChange = useCallback(
    (open: boolean) => {
      setIsAccountDropdownOpen(open);
      if (open) {
        focusFirstInDropdown();
      }
    },
    [focusFirstInDropdown]
  );

  return (
    <header className="top-0 z-10 border-b border-brand-secondary/50 bg-brand-secondary text-white shadow-lg transition-colors dark:border-dark-muted/40 dark:bg-dark-surface dark:text-dark-text">
      <nav className="py-3.5 sm:py-3">
        <div className="mx-auto flex w-full max-w-screen-2xl items-center gap-4 px-2 sm:px-4 lg:px-6">
          {/* Logo */}
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
              style={{ objectFit: 'contain' }}
              priority
            />
          </Link>

          <div className="flex flex-1 flex-wrap items-center gap-4 md:gap-6">
            {/* Search (desktop) */}
            <div className="hidden flex-1 items-center justify-center md:flex">
              <div className="w-full max-w-2xl lg:max-w-3xl">
                <Search placeholder="Search products" className="w-full" />
              </div>
            </div>

            <div className="ml-auto flex items-center gap-3 md:gap-6">
              {/* Support */}
              <Link
                href="/support"
                className="hidden items-center gap-1 font-semibold text-white transition-colors hover:text-brand-warning focus:text-brand-warning active:text-brand-warning dark:text-dark-text dark:hover:text-brand-warning dark:focus:text-brand-warning dark:active:text-brand-warning md:inline-flex"
              >
                <FiHelpCircle className="h-4 w-4" aria-hidden="true" />
                Help
              </Link>

              {/* Seller / Business buttons */}
              {!props.user || props.user.roleId !== 2 ? (
                <Link
                  href="/sell"
                  className="hidden rounded-full border border-brand-warning bg-brand-warning px-4 py-2 text-sm font-semibold text-white shadow-sm transition-transform hover:text-brand-warning hover:-translate-y-0.5 hover:bg-white focus:text-brand-warning focus:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/60 active:translate-y-0 md:inline-flex"
                >
                  Open your shop
                </Link>
              ) : null}

              {props.user && props.user.roleId === 2 ? (
                <Link
                  href={`/profile/${props.user.username}/business`}
                  className="hidden rounded-full border border-brand-warning bg-brand-warning px-4 py-2 text-sm font-semibold text-white shadow-sm transition-transform hover:text-brand-warning hover:-translate-y-0.5 hover:bg-white focus:text-brand-warning focus:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/60 active:translate-y-0 md:inline-flex"
                >
                  My Products
                </Link>
              ) : null}

              {/* Logged-in vs not logged-in */}
              {props.user ? (
                <>
                  <div className="hidden md:mr-10 md:block">
                    <ProfileDropdown user={props.user} />
                  </div>
                  {showCart ? <Cart cartSum={props.cartSum} /> : null}
                </>
              ) : (
                <>
                  {/* ✅ Account dropdown with corrected focus behavior */}
                  <div className="hidden md:inline-flex relative">
                    <FocusTrapWrapper
                      active={isAccountDropdownOpen}
                      focusTrapOptions={{
                        allowOutsideClick: true,
                        escapeDeactivates: true,
                        fallbackFocus: 'body',
                      }}
                    >
                      <div ref={dropdownRef}>
                        <AccountDropdown onOpenChange={handleAccountDropdownOpenChange} />
                      </div>
                    </FocusTrapWrapper>
                  </div>
                  {showCart ? <Cart cartSum={props.cartSum} /> : null}
                </>
              )}

              {/* Burger button (mobile) */}
              <button
                onClick={toggleMenu}
                className="inline-flex items-center rounded-lg border border-brand-border bg-white p-2 text-brand-text transition-colors hover:border-brand-primary hover:bg-white/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/50 dark:border-dark-muted/40 dark:bg-dark-surface dark:text-dark-text md:hidden"
                aria-controls="navbar-menu"
                aria-expanded={isOpen}
                aria-haspopup="true"
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className="h-6 w-6"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile search */}
        <div className="order-last mt-3 w-full basis-full md:hidden">
          <div className="flex w-full justify-center px-2">
            <Search placeholder="Search products" className="w-full max-w-md" />
          </div>
        </div>

        {/* Mobile dropdown */}
        {isOpen && (
          <>
            <div
              className="fixed inset-0 z-40 bg-gradient-to-b from-transparent via-black/60 to-black/70 transition-opacity md:hidden"
              aria-hidden="true"
              onClick={closeMenu}
            />
            <FocusTrap
              focusTrapOptions={{
                clickOutsideDeactivates: true,
                escapeDeactivates: true,
              }}
            >
              <div
                className="relative z-50 w-full md:hidden"
                id="navbar-menu"
                role="menu"
              >
                <ul className="mt-4 flex flex-col items-start gap-2 bg-brand-surface p-4 text-brand-text shadow-lg dark:bg-dark-surface dark:text-dark-text">
                  <li className="w-full">
                    <Link
                      href="/support"
                      onClick={closeMenu}
                      className="text-brand-text inline-flex w-full items-center gap-2 py-2 font-semibold transition-colors hover:text-brand-primary focus:text-brand-primary active:text-brand-primary"
                    >
                      <FiHelpCircle className="h-4 w-4" aria-hidden="true" />
                      Help
                    </Link>
                  </li>
                  {(!props.user || props.user.roleId !== 2) && (
                    <li className="w-full">
                      <Link
                        href="/sell"
                        onClick={closeMenu}
                        className="ml-0 block w-full max-w-[12rem] rounded-full border border-brand-warning bg-brand-warning px-4 py-2 text-center font-semibold text-white shadow-sm transition-colors hover:bg-brand-primary focus:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent/60 active:bg-brand-primary"
                      >
                        Open your shop
                      </Link>
                    </li>
                  )}
                  {props.user && props.user.roleId === 2 && (
                    <li className="w-full">
                      <Link
                        href={`/profile/${props.user.username}/business`}
                        onClick={closeMenu}
                        className="ml-0 block w-full max-w-[12rem] rounded-full border border-brand-warning bg-brand-warning px-4 py-2 text-center font-semibold text-white shadow-sm transition-colors hover:bg-brand-primary focus:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent/60 active:bg-brand-primary"
                      >
                        My Products
                      </Link>
                    </li>
                  )}
                  {props.user ? (
                    <>
                      <li className="w-full">
                        <Link
                          href={`/profile/${props.user.username}`}
                          onClick={closeMenu}
                          className="text-brand-text block w-full py-2 font-semibold transition-colors hover:text-brand-primary focus:text-brand-primary active:text-brand-primary"
                        >
                          {props.user.firstname}'s Dashboard
                        </Link>
                      </li>
                      <li className="w-full">
                        <LogoutButton onLogout={closeMenu} />
                      </li>
                    </>
                  ) : (
                    <>
                      <li className="w-full">
                        <Link
                          href="/login"
                          onClick={closeMenu}
                          className="text-brand-text block w-full py-2 font-semibold transition-colors hover:text-brand-primary focus:text-brand-primary active:text-brand-primary"
                        >
                          Login
                        </Link>
                      </li>
                      <li className="w-full">
                        <hr className="mb-4" />
                        <div className="text-brand-muted dark:text-dark-muted">
                          New to eStores?
                        </div>
                        <Link
                          href="/register"
                          onClick={closeMenu}
                          className="text-center font-semibold text-brand-primary underline transition-colors hover:text-brand-secondary focus:text-brand-secondary active:text-brand-secondary"
                        >
                          Register
                        </Link>{' '}
                        as a <strong>buyer</strong> or <strong>seller</strong> and start exploring!
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </FocusTrap>
          </>
        )}
      </nav>
    </header>
  );
}
