import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getProductCategoriesInsecure } from '../../../../../database/productCategories';
import { getProductInsecure } from '../../../../../database/products';
import { getUser } from '../../../../../database/users';
import EditProductFormApi from './EditProductFormApi';

type Props = {
  searchParams: Promise<{
    productId: string;
    rsc: string;
  }>;
};

export default async function EditProductPage(props: Props) {
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

  const productId = Number((await props.searchParams).productId);

  const product = await getProductInsecure(productId);

  const productCategories = await getProductCategoriesInsecure();

  return (
    <main className="flex-grow  w-full max-w-full px-20 py-12">
      <h1 className="mb-4 text-4xl text-center">Edit Product</h1>
      <EditProductFormApi
        username={user.username}
        product={product!}
        productCategories={productCategories}
      />
    </main>
  );
}
