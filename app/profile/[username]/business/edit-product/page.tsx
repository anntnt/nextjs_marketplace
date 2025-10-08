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
  // 1. Check if the sessionToken cookie exists
  const sessionTokenCookie = (cookies()).get('sessionToken');

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
    <main className="flex-grow bg-brand-bg w-full max-w-full px-20 py-12">
      <h1 className="text-4xl font-semibold text-center text-brand-text dark:text-dark-text">Edit Product</h1>
      <EditProductFormApi
        username={user.username}
        product={product!}
        productCategories={productCategories}
      />
    </main>
  );
}
