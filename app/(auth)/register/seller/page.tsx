import { cookies } from 'next/headers';
import { getUser } from '../../../../database/users';
import RegistrationFlowClient from '../RegistrationFlowClient';

type Props = {
  searchParams: Promise<{
    returnTo?: string | string[];
  }>;
};

export default async function SellerRegisterPage(props: Props) {
  const { returnTo } = await props.searchParams;
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get('sessionToken');
  const user = sessionToken ? await getUser(sessionToken.value) : undefined;

  return (
    <main className="w-full max-w-full flex-grow bg-brand-bg px-5 py-16 text-brand-text transition-colors dark:bg-dark-bg dark:text-dark-text sm:px-20">
      <div className="mx-auto mb-8 max-w-2xl text-center">
        <h1 className="text-4xl font-semibold text-brand-text dark:text-dark-text">Register as a Seller</h1>
      </div>
      <RegistrationFlowClient
        variant="seller"
        returnTo={returnTo}
        currentUserRoleId={user?.roleId ?? null}
      />
    </main>
  );
}
