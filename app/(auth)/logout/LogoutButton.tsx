'use client';

import { useRouter } from 'next/navigation';
import { logout } from './actions';

export default function LogoutButton() {
  const router = useRouter();

  return (
    <form>
      <div
        role="button"
        aria-label="Logout"
        tabIndex={0}
        className=" cursor-pointer border-none space-x-4 text-black hover:text-blue-1000 bg-yellow-100 hover:bg-yellow-100   focus:yellow-100     px-3 py-2.5 me-2  dark:bg-yellow-100 dark:hover:bg-yellow-100 focus:outline-none dark:focus:bg-yellow-100 dark:text-white text-sm"
        onClick={async () => {
          await logout();
          router.refresh();
        }}
        onKeyDown={async (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            // Simulate button click on Enter or Space
            await logout();
            router.refresh();
          }
        }}
      >
        (Logout)
      </div>
    </form>
  );
}
