import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getProductCategoriesInsecure } from '../../../../../database/productCategories';
import { getUser } from '../../../../../database/users';
import ProductFormApi from './ProductFormApi';

export default async function UserProfilePage() {
  // const { username } = await props.params;

  // Task: Add redirect to login page if user is not logged in
  // 1. Check if the sessionToken cookie exists
  // 2. Query the current user with the sessionToken
  // 3. If user doesn't exist, redirect to login page
  // 4. If user exists, render the page

  // 1. Check if the sessionToken cookie exists
  const sessionTokenCookie = (await cookies()).get('sessionToken');

  // 2. Query the current user with the sessionToken
  const user = sessionTokenCookie && (await getUser(sessionTokenCookie.value));

  // 3. If user doesn't exist, redirect to login page
  if (!user) {
    redirect('/login');
  }

  if (user.roleId !== 2) {
    redirect('/seller-area-only');
  }
  const productCategories = await getProductCategoriesInsecure();
  return (
    <main className="flex-grow  bg-gray-50 w-full max-w-full px-20 py-12">
      <h1 className="mb-4 text-4xl text-center">New Product</h1>
      <ProductFormApi
        sellerId={user.id}
        productCategories={productCategories}
      />
    </main>
  );
}
