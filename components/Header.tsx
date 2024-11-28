'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import LogoutButton from '../app/(auth)/logout/LogoutButton';
import type { User } from '../migrations/0001-createTableUsers';
import Cart from './Cart';

type UserWithUsernameAndRole = User & {
  username: string;
  role: string;
};

type UserProps = {
  user: User | UserWithUsernameAndRole | undefined;
  cartSum?: string;
};

export default function Component(props: UserProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="top-0 bg-white shadow-md z-10">
      <nav className=" bg-yellow-100 border-gray-200  py-3.5 sm:py-3 dark:bg-gray-900 flex justify-between items-center px-4 sm:px-8 xl:px-6 2xl:px-20  mx-auto">
        <div className="flex flex-wrap items-center justify-between w-full max-w-full 2xl:px-20  mx-auto">
          {/* Left Side - Links */}
          <div className="flex items-center flex-shrink-0 justify-center space-x-4  font-semibold">
            <Link
              href="/"
              className="text-xl font-semibold dark:text-white w-full md:w-auto md:flex md:justify-center "
            >
              <Image
                src="/images/estores_logo.png"
                objectFit="contain"
                width={559}
                height={102}
                className="w-28 md:w-36  lg:w-40   h-auto pb-3 sm:pb-2"
                alt="eStores logo"
              />
            </Link>
            <ul className="hidden md:flex space-x-8 xl:space-x-4 2xl:space-x-8">
              <li>
                <Link
                  href="/marketplace"
                  className="text-black dark:text-white hover:text-blue-1000  active:text-blue-1000 active:font-semibold focus:text-blue-1000 focus:font-semibold"
                >
                  Marketplace
                </Link>
              </li>

              <li>
                <Link
                  href="/about"
                  className="text-black dark:text-white hover:text-blue-1000"
                >
                  About
                </Link>
              </li>

              {!props.user || props.user.roleId === 3 ? (
                <li>
                  <Link
                    href="/become-a-seller"
                    className="text-black dark:text-white hover:text-blue-1000"
                  >
                    Become a Seller
                  </Link>
                </li>
              ) : props.user.roleId === 2 ? (
                <li>
                  <Link
                    href={`/profile/${props.user.username}/business`}
                    className="text-black dark:text-white hover:text-blue-1000"
                  >
                    <span className=" underline  decoration-8 decoration-green-400 dark:decoration-green-300 ">
                      My Business
                    </span>
                  </Link>
                </li>
              ) : (
                <div />
              )}
              <li>
                <Link
                  href="/support"
                  className="text-black dark:text-white hover:text-blue-1000"
                >
                  Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Right Side - Search Box, Cart, Login/Register */}
          <div className="flex items-center space-x-5 sm:space-x-4 xl:space-x-4 2xl:space-x-10 ">
            {/* Search Box */}
            <div className="relative">
              <input
                className="px-2 sm:px-4 py-2 rounded-lg border border-gray-300 dark:bg-gray-800 dark:text-white dark:border-gray-600 "
                placeholder="Search..."
              />
            </div>
            {/* only display cart icon when user role is buyer */}
            {props.user && props.user.roleId === 3 ? (
              <Cart cartSum={props.cartSum} />
            ) : (
              <div />
            )}
            {props.user ? (
              <div className=" hidden md:flex  me-5 items-center relative  space-x-2">
                <Link
                  href={`/profile/${props.user.username}`}
                  className="font-semibold text-black dark:text-white hover:text-blue-1000 "
                >
                  {props.user.firstname}'s Profile
                </Link>
                <LogoutButton />
              </div>
            ) : (
              <>
                {/* Login/Register */}
                <Link
                  href="/login"
                  className="hidden md:flex text-black dark:text-white hover:text-blue-1000"
                >
                  Login&nbsp; &nbsp;
                </Link>

                <Link
                  href="/register"
                  className=" hidden md:flex text-black dark:text-white hover:text-blue-1000"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={toggleMenu}
            className="bg-blue-1000  border-blue-1000 inline-flex items-center p-2 ml-3 text-white rounded-lg md:hidden hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
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

          {/* Mobile Menu */}
          {isOpen && (
            <div className="w-full md:hidden" id="navbar-menu">
              <ul className="flex flex-col items-start p-4 mt-4  dark:bg-gray-800">
                <li className="w-full">
                  <Link
                    href="/marketplace"
                    className="block w-full py-2 text-black dark:text-white"
                  >
                    Marketplace
                  </Link>
                </li>

                <li className="w-full">
                  <Link
                    href="/about"
                    className="block w-full py-2 text-black dark:text-white"
                  >
                    About
                  </Link>
                </li>
                <li className="w-full">
                  <Link
                    href="/support"
                    className="block w-full py-2 text-black dark:text-white"
                  >
                    Support
                  </Link>
                </li>
                {!props.user || props.user.roleId === 3 ? (
                  <li className="w-full">
                    <Link
                      href="/become-a-seller"
                      className="block w-full py-2 text-black dark:text-white"
                    >
                      Become a Seller
                    </Link>
                  </li>
                ) : (
                  <li className="w-full">
                    <Link
                      href={`/profile/${props.user.username}/business`}
                      className="block w-full py-2 text-black dark:text-white "
                    >
                      <span className="font-semibold underline  decoration-8 decoration-green-400 dark:decoration-green-300 ">
                        My Business
                      </span>
                    </Link>
                  </li>
                )}

                {props.user ? (
                  <>
                    <li className="w-full ">
                      <Link
                        href={`/profile/${props.user.username}`}
                        className="font-semibold"
                      >
                        {props.user.firstname}'s Profile
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
                        className="block w-full py-2 text-black dark:text-white"
                      >
                        Login
                      </Link>
                    </li>

                    <li className="w-full">
                      <Link
                        href="/register"
                        className="block w-full py-2 text-black dark:text-white"
                      >
                        Register
                      </Link>
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
