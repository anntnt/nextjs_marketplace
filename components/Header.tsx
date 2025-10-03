'use client';
import Image from 'next/image';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { createElement, useEffect, useState } from 'react';
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

export default function Component(props: UserProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
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
    <header className="top-0 bg-white shadow-md z-10">
      <nav className="bg-yellow-100 border-gray-200 py-3.5 sm:py-3 dark:bg-gray-900">
        <div className="mx-auto flex w-full max-w-screen-3xl flex-wrap items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          {/* Left Side - Links */}
          <div className="flex items-center gap-6 font-semibold">
            <Link
              href="/"
              className="text-xl active:text-blue-1000 focus:text-blue-1000 font-semibold dark:text-white w-full md:w-auto md:flex md:justify-center "
            >
              <Image
                src="/images/estores_logo.png"
                width={559}
                height={102}
                className="w-32 md:w-36  lg:w-40   h-auto pb-3 sm:pb-2"
                alt="eStores logo"
                style={{ objectFit: 'contain' }}
                priority
              />
            </Link>
            <ul className="hidden md:flex flex-wrap items-center gap-6 xl:gap-8 active:text-blue-1000 focus:text-blue-1000">
              <li className="active:text-blue-1000 focus:text-blue-1000">
                <Link
                  href="/#categories"
                  className="font-semibold text-black dark:text-white hover:text-blue-1000  active:text-blue-1000    focus:text-blue-1000"
                >
                  Categories
                </Link>
              </li>

              <li>
                <Link
                  href="/become-a-seller"
                  className="font-semibold text-black dark:text-white hover:text-blue-1000 active:text-blue-1000  focus:text-blue-1000"
                >
                  Become a seller
                </Link>
              </li>

              {props.user && props.user.roleId === 2 && (
                <li>
                  <Link
                    href={`/profile/${props.user.username}/business`}
                    className="font-semibold active:text-blue-1000 focus:text-blue-1000 text-black dark:text-white hover:text-blue-1000 underline  decoration-4 decoration-blue-1000 dark:decoration-blue-1000   "
                  >
                    My Products
                  </Link>
                </li>
              )}
            </ul>
          </div>

          {/* Right Side - Search Box, Cart, Login/Register */}
          <div className="flex flex-1 flex-wrap items-center justify-end gap-6">
            <div className="hidden md:block">
              <Search
                placeholder="Search products"
                className="w-full max-w-xl lg:max-w-2xl"
              />
            </div>
            <div className="flex items-center gap-6 md:gap-8">
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
              {/* Mobile Menu Toggle */}
              <button
                onClick={toggleMenu}
                className="bg-blue-1000 border-blue-1000 inline-flex items-center p-2 text-white rounded-lg md:hidden hover:bg-blue-900 focus:outline-none"
                aria-controls="navbar-menu"
                aria-expanded={isOpen}
                aria-haspopup="true"
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className="w-6 h-6"
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

          {/* Mobile Menu */}
          {isOpen && (
            <div
              className="w-full md:hidden"
              id="navbar-menu"
              role="menu"
              aria-hidden={!isOpen}
            >
              <ul className="flex flex-col items-start p-4 mt-4  dark:bg-gray-800">
                <li className="w-full">
                  <Link
                    href="/#categories"
                    onClick={closeMenu}
                    className="block w-full py-2 text-black dark:text-white active:text-blue-1000  focus:text-blue-1000 font-semibold  hover:text-blue-1000  "
                  >
                    Categories
                  </Link>
                </li>

                <li className="w-full">
                  <Link
                    href="/about"
                    onClick={closeMenu}
                    className="font-semibold block w-full py-2 text-black dark:text-white active:text-blue-1000  focus:text-blue-1000"
                  >
                    About
                  </Link>
                </li>
                <li className="w-full">
                  <Link
                    href="/become-a-seller"
                    onClick={closeMenu}
                    className="font-semibold block w-full py-2 text-black dark:text-white active:text-blue-1000  focus:text-blue-1000"
                  >
                    Become a seller
                  </Link>
                </li>
                <li className="w-full">
                  <Link
                    href="/support"
                    onClick={closeMenu}
                    className="font-semibold block w-full py-2 text-black dark:text-white active:text-blue-1000  focus:text-blue-1000"
                  >
                    Support
                  </Link>
                </li>
                {props.user && props.user.roleId === 2 && (
                  <li className="w-full">
                    <Link
                      href={`/profile/${props.user.username}/business`}
                      onClick={closeMenu}
                      className="active:text-blue-1000 focus:text-blue-1000 block w-full py-2 text-black dark:text-white "
                    >
                      <span className="font-semibold underline  decoration-4 decoration-blue-1000 dark:decoration-bue-1000 ">
                        My Products
                      </span>
                    </Link>
                  </li>
                )}

                {props.user ? (
                  <>
                    <li className="w-full ">
                      <Link
                        href={`/profile/${props.user.username}`}
                        onClick={closeMenu}
                        className="font-semibold text-black dark:text-white hover:text-blue-1000  active:text-blue-1000  focus:text-blue-1000 "
                      >
                        {props.user.firstname}'s Dashboard
                      </Link>
                    </li>
                    <li className="w-full ">
                      <LogoutButton onLogout={closeMenu} />
                    </li>
                  </>
                ) : (
                  <>
                    {/* Login/Register */}

                    <li className="w-full">
                      <Link
                        href="/login"
                        onClick={closeMenu}
                        className="font-semibold block w-full py-2 text-black dark:text-white active:text-blue-1000  focus:text-blue-1000"
                      >
                        Login
                      </Link>
                    </li>

                    <li className="w-full">
                      <hr className="mb-4" />
                      <div className=" text-black dark:text-white">
                        New to eStores?
                      </div>
                      <Link
                        href="/register"
                        onClick={closeMenu}
                        className="underline text-black dark:text-white hover:text-blue-1000 active:text-blue-1000 focus:text-blue-1000 font-semibold dark:hover:bg-gray-600 dark:hover:text-white text-center"
                      >
                        Register
                      </Link>{' '}
                      as a <strong>buyer</strong> or <strong>seller</strong> and
                      start exploring!
                    </li>
                  </>
                )}
              </ul>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
