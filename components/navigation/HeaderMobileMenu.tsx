'use client';
import type { Route } from 'next';
import Link from 'next/link';
import { FiHelpCircle } from 'react-icons/fi';
import LogoutButton from '../../app/(auth)/logout/LogoutButton';
import type { User } from '../../migrations/0001-createTableUsers';
import { isSeller } from '../../lib/navigation/header';

type Props = {
  user: User | undefined;
  isOpen: boolean;
  sellerRegisterHref: Route | string;
  onClose: () => void;
};

export default function HeaderMobileMenu({
  user,
  isOpen,
  sellerRegisterHref,
  onClose,
}: Props) {
  if (!isOpen) return null;
  const userIsSeller = isSeller(user);

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-gradient-to-b from-transparent via-black/60 to-black/70 transition-opacity md:hidden"
        aria-hidden="true"
        onClick={onClose}
      />

      <div id="navbar-menu" role="menu">
        <ul className="mt-4 flex flex-col items-start gap-2 bg-brand-surface p-4 text-brand-text shadow-lg dark:bg-dark-surface dark:text-dark-text">
          <li className="w-full">
            <Link
              href="/support"
              onClick={onClose}
              className="text-brand-text inline-flex w-full items-center gap-2 py-2 font-semibold transition-colors hover:text-brand-primary focus:text-brand-primary active:text-brand-primary"
            >
              <FiHelpCircle className="h-4 w-4" aria-hidden="true" />
              Help
            </Link>
          </li>
          {!userIsSeller && (
            <li className="w-full">
              <Link
                href={sellerRegisterHref}
                onClick={onClose}
                className="ml-0 block w-full max-w-[12rem] rounded-full border border-brand-warning bg-brand-warning px-4 py-2 text-center font-semibold text-white shadow-sm transition-colors hover:bg-brand-primary focus:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent/60 active:bg-brand-primary"
              >
                Open your shop
              </Link>
            </li>
          )}
          {user && userIsSeller && (
            <li className="w-full">
              <Link
                href={`/profile/${user.username}/business`}
                onClick={onClose}
                className="ml-0 block w-full max-w-[12rem] rounded-full border border-brand-warning bg-brand-warning px-4 py-2 text-center font-semibold text-white shadow-sm transition-colors hover:bg-brand-primary focus:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent/60 active:bg-brand-primary"
              >
                My Products
              </Link>
            </li>
          )}
          {user ? (
            <>
              <li className="w-full">
                <Link
                  href={`/profile/${user.username}`}
                  onClick={onClose}
                  className="text-brand-text block w-full py-2 font-semibold transition-colors hover:text-brand-primary focus:text-brand-primary active:text-brand-primary"
                >
                  {user.firstname}&apos;s Dashboard
                </Link>
              </li>
              <li className="w-full">
                <LogoutButton onLogout={onClose} />
              </li>
            </>
          ) : (
            <>
              <li className="w-full">
                <Link
                  href="/login"
                  onClick={onClose}
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
                  onClick={onClose}
                  className="text-center font-semibold text-brand-primary underline transition-colors hover:text-brand-secondary focus:text-brand-secondary active:text-brand-secondary"
                >
                  Register
                </Link>{' '}
                as a <strong>buyer</strong> or <strong>seller</strong> and start
                exploring!
              </li>
            </>
          )}
        </ul>
      </div>
    </>
  );
}
