import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getUser } from '../../../../database/users';

export default async function UserProfilePage() {
  // 1. Check if the sessionToken cookie exists
  const sessionTokenCookie = (cookies()).get('sessionToken');

  // 2. Query the current user with the sessionToken
  const user = sessionTokenCookie && (await getUser(sessionTokenCookie.value));

  // 3. If user doesn't exist, redirect to login page
  if (!user) {
    redirect('/login');
  }

  return (
    <main className="w-full max-w-full flex-grow bg-brand-bg text-brand-text transition-colors dark:bg-dark-bg dark:text-dark-text px-20 py-12">
      <h1 className="text-4xl font-semibold text-center text-brand-text dark:text-dark-text">Messages Inbox</h1>
      <section className="py-8 antialiased text-xl font-normal sm:px-16 xl:px-48 dark:text-gray-400">
        <div className="mx-auto text-center max-w-screen-xl px-4 2xl:px-0">
          <p>
            <i>This page is currently in progress. Please check back later.</i>
          </p>
        </div>
      </section>
    </main>
  );
}
