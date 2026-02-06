import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getProductCategoriesInsecure } from '../../../../../database/productCategories';
import { getUser } from '../../../../../database/users';
import ProductFormApi from './ProductFormApi';

export default async function UserProfilePage() {
  // 1. Check if the sessionToken cookie exists
  const sessionTokenCookie = (await cookies()).get('sessionToken');

  // 2. Query the current user with the sessionToken
  const user = await getUser(sessionTokenCookie?.value ?? '');

  // 3. If user doesn't exist, redirect to login page
  if (!user) {
    redirect('/login');
  }

  if (user.roleId !== 2) {
    redirect('/seller-area-only');
  }
  const productCategories = await getProductCategoriesInsecure();
  return (
    <main className="w-full max-w-full flex-grow bg-brand-bg text-brand-text transition-colors dark:bg-dark-bg dark:text-dark-text px-20 py-12">
      <h1 className="text-4xl font-semibold text-center text-brand-text dark:text-dark-text">New Product</h1>
      <ProductFormApi
        sellerId={user.id}
        productCategories={productCategories}
      />
    </main>
  );
}
