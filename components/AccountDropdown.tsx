'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Component() {
  const [isOpen, setIsOpen] = useState(false);
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
            fill-rule="evenodd"
            d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4h-4Z"
            clip-rule="evenodd"
          />
        </svg>
        Account
      </button>
      {isOpen && (
        <div className="absolute z-10 bg-gray-100 divide-y divide-gray-100 rounded-lg shadow-sm w-60 dark:bg-gray-700">
          <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
            <li>
              <Link
                href="/login"
                className="rounded-lg block px-4 py-2 bg-yellow-100  dark:hover:bg-gray-600 dark:hover:text-white font-semibold text-black dark:text-white hover:text-blue-1000 active:text-blue-1000 focus:text-blue-1000 text-center"
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
                href="/register"
                className="underline text-black dark:text-white hover:text-blue-1000 active:text-blue-1000 focus:text-blue-1000 font-semibold dark:hover:bg-gray-600 dark:hover:text-white text-center"
              >
                Register
              </Link>{' '}
              as a <strong>buyer</strong> or <strong>seller</strong> and start
              exploring!
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
