'use client';

import { usePathname, useRouter } from 'next/navigation';
import { logout } from './actions';
import type { Route } from 'next';

type Props = {
  onLogout?: () => void;
};

export default function LogoutButton({ onLogout }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    await logout();
    const target = pathname && pathname !== '/logout' ? pathname : '/';
    router.push(target as Route);
    router.refresh();
    onLogout?.();
  };

  return (
    <form>
      <button
        type="button"
        aria-label="Logout"
        className="block border-0 bg-white py-1 font-semibold text-brand-warning underline underline-offset-2 transition-colors hover:text-brand-secondary focus:text-brand-secondary active:text-brand-secondary sm:px-4 sm:text-center"
        onClick={handleLogout}
      >
        Logout
      </button>
    </form>
  );
}
