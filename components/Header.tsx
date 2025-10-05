'use client';

import Image from 'next/image';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { createElement, useEffect, useState } from 'react';
import { FiHelpCircle } from 'react-icons/fi';
import LogoutButton from '../app/(auth)/logout/LogoutButton';
import type { User } from '../migrations/0001-createTableUsers';

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
  {
    ssr: false,
    loading: () => null,
  },
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
  {
    ssr: false,
    loading: () => null,
  },
);

function ProfileDropdown(props: ProfileDropdownProps) {
  return createElement(profileDropdownComponent, props);
}

const accountDropdownComponent = dynamic(() => import('./AccountDropdown'), {
  ssr: false,
  loading: () => null,
});

function AccountDropdown() {
  return createElement(accountDropdownComponent, {});
}

export default function Header(props: UserProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((previous) => !previous);
  const closeMenu = () => setIsOpen(false);

  const showCart = !props.user || props.user.roleId === 3;

  useEffect(() => {
    if (!isOpen) {
      document.body.style.removeProperty('overflow');
      return;
    }

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
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

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <header className="top-0 z-10 bg-white shadow-md">
      <nav className="bg-yellow-100 border-gray-200 py-3.5 sm:py-3 dark:bg-gray-900">
        <div className="mx-auto flex w-full max-w-screen-2xl items-center gap-4 px-2 sm:px-4 lg:px-6">
          <Link
            href="/"
            className="flex items-center text-xl font-semibold active:text-blue-1000 focus:text-blue-1000 dark:text-white"
          >
            <Image
              src="/images/estores_logo.png"
              width={559}
              height={102}
              className="h-auto w-32 pb-3 sm:pb-2 md:w-36 lg:w-40"
              alt="eStores logo"
              style={{ objectFit: 'contain' }}
              priority
            />
          </Link>

          <div className="flex flex-1 flex-wrap items-center justify-end gap-4 md:gap-6">
            <ul className="hidden items-center gap-6 font-semibold md:flex xl:gap-8">
              <li>
                <Link
                  href="/support"
                  className="inline-flex items-center gap-1 text-black hover:text-blue-1000 focus:text-blue-1000 active:text-blue-1000 dark:text-white"
                >
                  <FiHelpCircle className="h-4 w-4" aria-hidden="true" />
                  Help
                </Link>
              </li>
              <li>
                <Link
                  href="/sell"
                  className="text-black hover:text-blue-1000 focus:text-blue-1000 active:text-blue-1000 dark:text-white"
                >
                  Open your shop
                </Link>
              </li>
              {props.user && props.user.roleId === 2 && (
                <li>
                  <Link
                    href={`/profile/${props.user.username}/business`}
                    className="text-black underline decoration-4 decoration-blue-1000 hover:text-blue-1000 focus:text-blue-1000 active:text-blue-1000 dark:text-white dark:decoration-blue-1000"
                  >
                    My Products
                  </Link>
                </li>
              )}
            </ul>

            <div className="hidden flex-1 md:flex">
              <Search placeholder="Search products" className="w-full max-w-3xl lg:max-w-4xl" />
            </div>

            <div className="flex items-center gap-4 md:gap-6">
              <div className="w-full md:hidden">
                <Search placeholder="Search products" />
              </div>
              {props.user ? (
                <>
                  <ProfileDropdown user={props.user} />
                  {showCart ? <Cart cartSum={props.cartSum} /> : null}
                </>
              ) : (
                <>
                  <AccountDropdown />                
                  {showCart ? <Cart cartSum={props.cartSum} /> : null}
                </>
              )}
              <button
                onClick={toggleMenu}
                className="inline-flex items-center rounded-lg border border-blue-1000 bg-blue-1000 p-2 text-white hover:bg-blue-900 focus:outline-none md:hidden"
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

        {isOpen && (
          <div
            className="w-full md:hidden"
            id="navbar-menu"
            role="menu"
            aria-hidden={!isOpen}
          >
            <ul className="mt-4 flex flex-col items-start gap-2 p-4 dark:bg-gray-800">
              <li className="w-full">
                <Link
                  href="/support"
                  onClick={closeMenu}
                  className="inline-flex w-full items-center gap-2 py-2 font-semibold text-black hover:text-blue-1000 focus:text-blue-1000 active:text-blue-1000 dark:text-white"
                >
                  <FiHelpCircle className="h-4 w-4" aria-hidden="true" />
                  Help
                </Link>
              </li>
              <li className="w-full">
                <Link
                  href="/sell"
                  onClick={closeMenu}
                  className="block w-full py-2 font-semibold text-black hover:text-blue-1000 focus:text-blue-1000 active:text-blue-1000 dark:text-white"
                >
                  Open your shop
                </Link>
              </li>
              {props.user && props.user.roleId === 2 && (
                <li className="w-full">
                  <Link
                    href={`/profile/${props.user.username}/business`}
                    onClick={closeMenu}
                    className="block w-full py-2 text-black hover:text-blue-1000 focus:text-blue-1000 active:text-blue-1000 dark:text-white"
                  >
                    <span className="font-semibold underline decoration-4 decoration-blue-1000 dark:decoration-blue-1000">
                      My Products
                    </span>
                  </Link>
                </li>
              )}
              {props.user ? (
                <>
                  <li className="w-full">
                    <Link
                      href={`/profile/${props.user.username}`}
                      onClick={closeMenu}
                      className="block w-full py-2 font-semibold text-black hover:text-blue-1000 focus:text-blue-1000 active:text-blue-1000 dark:text-white"
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
                      className="block w-full py-2 font-semibold text-black hover:text-blue-1000 focus:text-blue-1000 active:text-blue-1000 dark:text-white"
                    >
                      Login
                    </Link>
                  </li>
                  <li className="w-full">
                    <hr className="mb-4" />
                    <div className="text-black dark:text-white">New to eStores?</div>
                    <Link
                      href="/register"
                      onClick={closeMenu}
                      className="text-center font-semibold text-black underline hover:text-blue-1000 focus:text-blue-1000 active:text-blue-1000 dark:text-white dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Register
                    </Link>{' '}
                    as a <strong>buyer</strong> or <strong>seller</strong> and start exploring!
                  </li>
                </>
              )}
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}
