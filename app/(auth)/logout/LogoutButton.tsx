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
        className=" underline block sm:px-4 py-1  dark:hover:bg-gray-600 dark:hover:text-white font-semibold text-black dark:text-white hover:text-blue-1000 active:text-blue-1000 focus:text-blue-1000 sm:text-center"
        onClick={async () => {
          await logout();
          router.push('/');
          router.refresh();
        }}
        onKeyDown={async (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            // Simulate button click on Enter or Space
            await logout();
            router.push('/');
            router.refresh();
          }
        }}
      >
        Logout
      </div>
    </form>
  );
}
