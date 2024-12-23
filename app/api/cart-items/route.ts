import { NextResponse } from 'next/server';
import {
  type Cart,
  type CartProduct,
  cartProductSchema,
  createOrUpdateCartItem,
  removeCartItems,
  updateCartItem,
} from '../../../database/cartProducts';
import { getUser } from '../../../database/users';
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

  /* Assume that user logged in and click the button 'Add to cart' */

  // 4. Create the new cart product
  const newCartProduct =
    sessionTokenCookie &&
    (await createOrUpdateCartItem(
      sessionTokenCookie,
      result.data.productId,
      result.data.quantity,
    ));

  const user = sessionTokenCookie && (await getUser(sessionTokenCookie));

  // 5. If the new CartProduct creation fails, return an error
  if (!newCartProduct || (user && user.roleId === 2)) {
    return NextResponse.json(
      {
        error: 'Please log in to your buyer account',
      },
      {
        status: 400,
      },
    );
  }
  // 6. Return the content of the cart product
  return NextResponse.json({
    cartProduct: { productId: newCartProduct?.productId },
  });
}
export type CreateCartProductResponseBodyPut =
  | {
      cartProduct: { productId: CartProduct['productId'] };
    }
  | {
      error: string;
    };

export async function PUT(
  request: Request,
): Promise<NextResponse<CreateCartProductResponseBodyPost>> {
  // 1. Get the cart product data from the request
  const body = await request.json();

  // 2. Validate cart product data with zod
  const result = cartProductSchema.safeParse(body);
  if (!result.success) {
    let errorMessage = '';

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

  /* Assume that user logged in and click the button 'Add to cart' */

  // 4. Create the new cart product
  const cartProduct =
    sessionTokenCookie &&
    (await updateCartItem(
      sessionTokenCookie,
      result.data.productId,
      result.data.quantity,
    ));

  // 5. If the new CartProduct creation fails, return an error
  if (!cartProduct) {
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
    cartProduct: { productId: cartProduct.productId },
  });
}

export type CartResponseDelete =
  | {
      products: Cart[];
    }
  | {
      error: string;
    };

export async function DELETE(): Promise<NextResponse<CartResponseDelete>> {
  // 3. Get the token from the cookie

  const sessionTokenCookie = await getCookie('sessionToken');

  // 4. Remove product
  const products =
    sessionTokenCookie && (await removeCartItems(sessionTokenCookie));

  if (!products) {
    return NextResponse.json(
      {
        error: 'Product not found',
      },
      {
        status: 400,
      },
    );
  }

  return NextResponse.json({ products: products });
}
