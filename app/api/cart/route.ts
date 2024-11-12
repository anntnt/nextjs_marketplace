import { redirect } from 'next/navigation';
import { NextResponse } from 'next/server';
import {
  type CartProduct,
  cartProductSchema,
  createOrUpdateCartItem,
} from '../../../database/cartProducts';
import { getCookie } from '../../../util/cookies';

export type CreateCartProductResponseBodyPost =
  | {
      cartProduct: { productId: CartProduct['productId'] };
    }
  | {
      error: string;
    };

export async function POST(
  request: Request,
): Promise<NextResponse<CreateCartProductResponseBodyPost>> {
  // 1. Get the cart product data from the request
  const body = await request.json();

  // 2. Validate cart product data with zod
  const result = cartProductSchema.safeParse(body);
  if (!result.success) {
    let errorMessage = '';
    if (result.error) console.log('result' + result.error.issues);
    result.error.issues.forEach((issue) => {
      errorMessage = errorMessage + issue.path[0] + ':' + issue.message + '. ';
    });

    return NextResponse.json(
      { error: errorMessage },
      {
        status: 400,
      },
    );
  }

  // 3. Get the token from the cookie
  /* Will do later, when user doesn't login then store cart data in to localStorage, but now user should login to add to cart ...*/
  const sessionTokenCookie = await getCookie('sessionToken');

  /*if (!sessionTokenCookie) {
    redirect(`/login?returnTo=/marketplace/product/${result.data.productId}`);
    return NextResponse.json(
      { error: '307' },
      {
        status: 307,
      },
    );
  }*/
  /* Assume that user logged in and click the button 'Add to cart' */

  // 4. Create the new cart product
  const newCartProduct =
    sessionTokenCookie &&
    (await createOrUpdateCartItem(
      sessionTokenCookie,
      result.data.productId,
      result.data.quantity,
    ));

  // 5. If the new CartProduct creation fails, return an error
  if (!newCartProduct) {
    return NextResponse.json(
      {
        error: 'cartProduct not created or access denied creating cart product',
      },
      {
        status: 400,
      },
    );
  }

  // 6. Return the content of the cart product
  return NextResponse.json({
    cartProduct: { productId: newCartProduct.productId },
  });
}
