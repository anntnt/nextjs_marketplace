import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getUser } from '../../database/users';

export const metadata = {
  title: 'Thank you for your order',
  description: 'Thank you for your order',
};
export default async function AboutPage() {
  // 1. Check if the sessionToken cookie exists
  const sessionTokenCookie = (await cookies()).get('sessionToken');

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
    <main className="bg-gray-50 dark:bg-gray-900 flex-grow  w-full max-w-full px-5 sm:px-20 py-12">
      <br />
      <h1 className="mb-4 text-4xl text-center">Thank you for your order</h1>
    </main>
  );
}
