'use client';

import Link from 'next/link';
import { useState } from 'react';
import LogoutButton from '../app/(auth)/logout/LogoutButton';
import type { User } from '../migrations/0001-createTableUsers';

type UserProps = { user?: User };

export default function Component(props: UserProps) {
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
            fillRule="evenodd"
            d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4h-4Z"
            clipRule="evenodd"
          />
        </svg>
        Hi, {props.user?.firstname}
      </button>
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40 pointer-events-none bg-gradient-to-b from-transparent via-black/60 to-black/70 transition-opacity"
            aria-hidden
          />
          <div className="absolute left-1/2 top-full -translate-x-1/2 z-50 flex w-56 flex-col items-stretch">
            <span className="block h-4" aria-hidden />
            <div className="rounded-lg bg-gray-100 shadow-sm dark:bg-gray-700">
              <ul className="px-6 pb-6 pt-5 text-sm text-gray-700 dark:text-gray-200">
                <li>
                  {props.user && (
                    <Link
                      href={`/profile/${props.user.username}`}
                      className="mx-auto block w-36 rounded-lg border-0 bg-yellow-100 px-4 py-2 text-center font-semibold text-black hover:text-blue-1000 focus:text-blue-1000 active:text-blue-1000 dark:text-white dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Dashboard
                    </Link>
                  )}
                </li>
                <li className="mt-4 flex justify-center">
                  <LogoutButton />
                </li>
              </ul>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
