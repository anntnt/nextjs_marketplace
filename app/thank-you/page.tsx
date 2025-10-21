import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getUser } from '../../database/users';

export const metadata = {
  title: 'Thank you for your order',
  description: 'Thank you for your order',
};
export default async function AboutPage() {
  // 1. Check if the sessionToken cookie exists
  const sessionTokenCookie = (cookies()).get('sessionToken');

  // 2. Query the current user with the sessionToken
  const user = sessionTokenCookie && (await getUser(sessionTokenCookie.value));

  // 3. If user doesn't exist, redirect to login page
  if (!user) {
    redirect('/login');
  }

  if (user.roleId !== 3) {
    redirect('/buyer-area-only');
  }
  return (
    <main className="w-full max-w-full flex-grow bg-brand-bg text-brand-text transition-colors dark:bg-dark-bg dark:text-dark-text px-5 sm:px-20 py-12">
      <br />
      <h1 className="text-4xl font-semibold text-center text-brand-text dark:text-dark-text">Thank you for your order</h1>
    </main>
  );
}
