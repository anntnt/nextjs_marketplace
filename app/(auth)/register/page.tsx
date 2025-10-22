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
    <main className="w-full max-w-full flex-grow bg-brand-bg px-5 py-16 text-brand-text transition-colors dark:bg-dark-bg dark:text-dark-text sm:px-20">
      <div className="mx-auto mb-8 max-w-2xl text-center">
        <h1 className="text-4xl font-semibold text-brand-text dark:text-dark-text">Create your eStores account</h1>
      </div>
      <RegisterForm variant="general" returnTo={returnTo} />
    </main>
  );
}
