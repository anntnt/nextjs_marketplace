import { cookies } from 'next/headers';
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
import {
  parseGuestCartCookie,
  replaceGuestCartItemQuantity,
  serializeGuestCart,
  upsertGuestCartItem,
} from '../../../util/guestCart';

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
  const cookieStore = await cookies();
  const guestCartItems = parseGuestCartCookie(cookieStore.get('guestCart')?.value);

  /* Assume that user logged in and click the button 'Add to cart' */

  // 4. Create the new cart product
  if (!sessionTokenCookie) {
    const updatedGuestCart = upsertGuestCartItem(
      guestCartItems,
      result.data.productId,
      result.data.quantity,
    );

    const response = NextResponse.json({
      cartProduct: { productId: result.data.productId },
    });
    response.cookies.set({
      name: 'guestCart',
      value: serializeGuestCart(updatedGuestCart),
      path: '/',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 30,
    });

    return response;
  }

  const newCartProduct = await createOrUpdateCartItem(
    sessionTokenCookie,
    result.data.productId,
    result.data.quantity,
  );

  const user = await getUser(sessionTokenCookie);

  // 5. If the new CartProduct creation fails, return an error
  if (!newCartProduct || (user && user.roleId === 2)) {
    return NextResponse.json(
      {
        error: 'Log in to your buyer account to purchase products on eStores.',
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
  const cookieStore = await cookies();
  const guestCartItems = parseGuestCartCookie(cookieStore.get('guestCart')?.value);

  /* Assume that user logged in and click the button 'Add to cart' */

  // 4. Create the new cart product
  if (!sessionTokenCookie) {
    const updatedGuestCart = replaceGuestCartItemQuantity(
      guestCartItems,
      result.data.productId,
      result.data.quantity,
    );

    const response = NextResponse.json({
      cartProduct: { productId: result.data.productId },
    });

    if (updatedGuestCart.length === 0) {
      response.cookies.set({ name: 'guestCart', value: '', path: '/', maxAge: 0 });
    } else {
      response.cookies.set({
        name: 'guestCart',
        value: serializeGuestCart(updatedGuestCart),
        path: '/',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 30,
      });
    }

    return response;
  }

  const cartProduct = await updateCartItem(
    sessionTokenCookie,
    result.data.productId,
    result.data.quantity,
  );

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
  const cookieStore = await cookies();

  // 4. Remove product
  if (!sessionTokenCookie) {
    const response = NextResponse.json({ products: [] });
    const guestCartItems = parseGuestCartCookie(cookieStore.get('guestCart')?.value);
    if (guestCartItems.length > 0) {
      response.cookies.set({ name: 'guestCart', value: '', path: '/', maxAge: 0 });
    }
    return response;
  }

  const products = await removeCartItems(sessionTokenCookie);

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
