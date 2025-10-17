import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getValidSessionToken } from '../../../database/sessions';
import { getSafeReturnToPath } from '../../../util/validation';
import RegisterForm from './RegisterForm';

type Props = {
  searchParams: Promise<{
    returnTo?: string | string[];
  }>;
};

export default async function RegisterPage(props: Props) {
  const { returnTo } = await props.searchParams;

  // Task: Add redirect to home if user is logged in

  // 1. Check if the sessionToken cookie exists
  const cookieStore = await cookies();
  const sessionTokenCookie = cookieStore.get('sessionToken');

  // 2. Check if the sessionToken cookie is still valid
  const session =
    sessionTokenCookie &&
    (await getValidSessionToken(sessionTokenCookie.value));

  // 3. If the sessionToken cookie is valid, redirect to home
  if (session) {
    redirect(getSafeReturnToPath(returnTo) || '/');
  }

  // 4. If the sessionToken cookie is invalid or doesn't exist, show the register form

  return (
    <main className="bg-brand-bg  antialiased dark:bg-dark-bg flex-grow  w-full max-w-full px-5 sm:px-20 py-12">
      <h1 className="text-4xl font-semibold text-center text-brand-text dark:text-dark-text">Register</h1>
      <RegisterForm returnTo={returnTo} />
    </main>
  );
}
