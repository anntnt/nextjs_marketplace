'use client';
import Image from 'next/image';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useState } from 'react';
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

const Search = dynamic<{ placeholder: string; className?: string }>(
  () => import('./Search'),
  {
    ssr: false,
    loading: () => null,
  },
);

const Cart = dynamic<{ cartSum?: string }>(() => import('./Cart'), {
  ssr: false,
  loading: () => null,
});

const ProfileDropdown = dynamic<{ user: User | UserWithUsernameAndRole | undefined }>(
  () => import('./ProfileDropdown'),
  {
    ssr: false,
    loading: () => null,
  },
);

const AccountDropdown = dynamic(() => import('./AccountDropdown'), {
  ssr: false,
  loading: () => null,
});

export default function Component(props: UserProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const showCart = !props.user || props.user.roleId === 3;

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
                  href="/about"
                  className="font-semibold text-black dark:text-white hover:text-blue-1000 active:text-blue-1000  focus:text-blue-1000"
                >
                  About
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
              <li>
                <Link
                  href="/support"
                  className="font-semibold text-black dark:text-white hover:text-blue-1000 active:text-blue-1000  focus:text-blue-1000"
                >
                  Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Right Side - Search Box, Cart, Login/Register */}
          <div className="flex flex-1 flex-wrap items-center justify-end gap-4">
            <div className="hidden w-full flex-1 md:block">
              <Search placeholder="Search products" className="max-w-3xl" />
            </div>
            <div className="flex items-center gap-4">
              <div className="w-full md:hidden">
                <Search placeholder="Search products" />
              </div>
              {showCart ? <Cart cartSum={props.cartSum} /> : null}
                {props.user ? (
                  <ProfileDropdown user={props.user} />
                ) : (
                  <AccountDropdown />
                )}
              {/* Mobile Menu Toggle */}
              <button
                onClick={toggleMenu}
                className="bg-blue-1000 border-blue-1000 inline-flex items-center p-2 text-white rounded-lg md:hidden hover:bg-blue-900 focus:outline-none"
                aria-controls="navbar-menu"
                aria-expanded={isOpen}
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
            <div className="w-full md:hidden" id="navbar-menu">
              <ul className="flex flex-col items-start p-4 mt-4  dark:bg-gray-800">
                <li className="w-full">
                  <Link
                    href="/#categories"
                    className="block w-full py-2 text-black dark:text-white active:text-blue-1000  focus:text-blue-1000 font-semibold  hover:text-blue-1000  "
                  >
                    Categories
                  </Link>
                </li>

                <li className="w-full">
                  <Link
                    href="/about"
                    className="font-semibold block w-full py-2 text-black dark:text-white active:text-blue-1000  focus:text-blue-1000"
                  >
                    About
                  </Link>
                </li>
                <li className="w-full">
                  <Link
                    href="/become-a-seller"
                    className="font-semibold block w-full py-2 text-black dark:text-white active:text-blue-1000  focus:text-blue-1000"
                  >
                    Become a seller
                  </Link>
                </li>
                <li className="w-full">
                  <Link
                    href="/support"
                    className="font-semibold block w-full py-2 text-black dark:text-white active:text-blue-1000  focus:text-blue-1000"
                  >
                    Support
                  </Link>
                </li>
                {props.user && props.user.roleId === 2 && (
                  <li className="w-full">
                    <Link
                      href={`/profile/${props.user.username}/business`}
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
                        className="font-semibold text-black dark:text-white hover:text-blue-1000  active:text-blue-1000  focus:text-blue-1000 "
                      >
                        {props.user.firstname}'s Dashboard
                      </Link>
                    </li>
                    <li className="w-full ">
                      <LogoutButton />
                    </li>
                  </>
                ) : (
                  <>
                    {/* Login/Register */}

                    <li className="w-full">
                      <Link
                        href="/login"
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
