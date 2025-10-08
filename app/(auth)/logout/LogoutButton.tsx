'use client';

import { useRouter } from 'next/navigation';
import { logout } from './actions';

type Props = {
  onLogout?: () => void;
};

export default function LogoutButton({ onLogout }: Props) {
  const router = useRouter();

  return (
    <form>
      <div
        role="button"
        aria-label="Logout"
        tabIndex={0}
        className="block py-1 font-semibold text-brand-primary underline underline-offset-2 transition-colors hover:text-brand-secondary focus:text-brand-secondary active:text-brand-secondary sm:px-4 sm:text-center dark:text-brand-primary"
        onClick={async () => {
          await logout();
          router.push('/');
          router.refresh();
          onLogout?.();
        }}
        onKeyDown={async (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            // Simulate button click on Enter or Space
            await logout();
            router.push('/');
            router.refresh();
            onLogout?.();
          }
        }}
      >
        Logout
      </div>
    </form>
  );
}
