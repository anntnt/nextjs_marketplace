'use client';
import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import LogoutButton from '../app/(auth)/logout/LogoutButton';
import type { CartItemsResponse } from '../app/api/cartItems/route';
import { type CartSum, getCartSum } from '../database/cartProducts';
import type { User } from '../migrations/0001-createTableUsers';
import Cart from './Cart';

type userProps = { user?: User };

export default function Component(props: userProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useState<string>('0');
  const toggleMenu = () => setIsOpen(!isOpen);
  const [error, setError] = useState(null);
  const [data, setData] = useState<CartItemsResponse | null>(null);

  //get Cart Items to show on Navbar
  useEffect(() => {
    const getCartItems = async () => {
      try {
        const response = await fetch('/api/cartItems');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const result: CartItemsResponse = await response.json(); // Type the result
        //console.log('API Response:', result); // Log the API response to inspect the data
        setData(result); // Set data
      } catch (error) {
        console.log(error);
      }
    };

    getCartItems();
  }, []);

  useEffect(() => {
    if (data) {
      //console.log('Data inside useEffect:', data); // Log the data after it's set
      // Type guard to check if `data` has cartSum
      if ('cartSum' in data) {
        // console.log('cartSum object:', data.cartSum); // Log the cartSum object
        //console.log('totalAmount as string:', data.cartSum.totalamount); // Log the totalAmount before conversion
        const totalAmount = data.cartSum.totalamount;
        //console.log('Converted totalAmount:', totalAmount); // Log the converted totalAmount

        //if (!isNaN(totalAmount)) {
        setCartItems(totalAmount); // Only set if the conversion is valid
        /* } else {
          console.error('totalAmount is not a valid number');
        }*/
      } else if ('error' in data) {
        console.error(data.error); // Log the error if `data` contains an error message
      }
    }
  }, [data]); // This effect will run whenever `data` changes
  return (
    <header className="sticky top-0 bg-white shadow-md z-10">
      <nav className="bg-yellow-100 border-gray-200  py-2.5 dark:bg-gray-900 flex justify-between items-center p-4  mx-auto">
        <div className="flex flex-wrap items-center justify-between w-full max-w-full xl:px-20  mx-auto">
          {/* Left Side - Links */}
          <div className="flex items-center space-x-8">
            <Link href="/" className="text-xl font-semibold dark:text-white ">
              <Image
                src="/images/vilya_logo.png"
                width={132}
                height={43}
                alt="Vilya logo"
              />
            </Link>
            <ul className="hidden md:flex space-x-8">
              <li>
                <Link
                  href="/marketplace"
                  className="text-black dark:text-white hover:text-blue-1000"
                >
                  Marketplace
                </Link>
              </li>
              <li>
                <Link
                  href="/sell"
                  className="text-black dark:text-white hover:text-blue-1000"
                >
                  Sell
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
          <div className="flex items-center space-x-4">
            {/* Search Box */}
            <div className="relative">
              <input
                type="text"
                className="px-4 py-2 rounded-lg border border-gray-300 dark:bg-gray-800 dark:text-white dark:border-gray-600"
                placeholder="Search..."
              />
            </div>
            <Cart cartItems={cartItems} />

            {props.user ? (
              <>
                <div className="hidden md:flex  items-center relative  space-x-2">
                  <Link
                    href={`/profile/${props.user.username}`}
                    className=" text-black dark:text-white hover:text-blue-1000"
                  >
                    {props.user.username}
                  </Link>
                  <LogoutButton />
                </div>
              </>
            ) : (
              <>
                {/* Login/Register */}
                <Link
                  href="/login"
                  className="hidden md:flex text-black dark:text-white hover:text-blue-1000"
                >
                  Login&nbsp; &nbsp;
                </Link>
                <span style={{ margin: 0 }} className="hidden md:flex">
                  /
                </span>
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
            className="bg-blue-1000  border-blue-1000 inline-flex items-center p-2 ml-3 text-black rounded-lg md:hidden hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
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
              ></path>
            </svg>
          </button>

          {/* Mobile Menu */}
          {isOpen && (
            <div className="w-full md:hidden" id="navbar-menu">
              <ul className="flex flex-col items-start p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 dark:bg-gray-800">
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
                    href="/sell"
                    className="block w-full py-2 text-black dark:text-white"
                  >
                    Sell
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

                {props.user ? (
                  <>
                    <li className="w-full ">
                      <Link href={`/profile/${props.user.username}`}>
                        {props.user.username}
                      </Link>
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
