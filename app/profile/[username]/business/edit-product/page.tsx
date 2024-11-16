import { cookies } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { useState } from 'react';
import { getProductCategoriesInsecure } from '../../../../../database/productCategories';
import {
  getProduct,
  getProductInsecure,
} from '../../../../../database/products';
import { getUser } from '../../../../../database/users';
import EditProductFormApi from './EditProductFormApi';
import ProductFormApi from './EditProductFormApi';

type Props = {
  searchParams: Promise<{
    productid: string;
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
  console.log('searchParams:', await props.searchParams);

  const productId = Number((await props.searchParams).productid);

  const product = await getProductInsecure(productId);

  // console.log('product ', product);
  const productCategories = await getProductCategoriesInsecure();
  //console.log('productCategories ', productCategories);
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
