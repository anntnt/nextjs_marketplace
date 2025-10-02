import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { removeCartProducts } from '../../../../database/cartProducts';
import { getCookie } from '../../../../util/cookies';
import {
  parseGuestCartCookie,
  removeGuestCartItem,
  serializeGuestCart,
} from '../../../../util/guestCart';

export type CartProductResponseDelete =
  | {
      success: true;
    }
  | {
      error: string;
    };
type CartProductParams = {
  params: Promise<{
    productId: string;
  }>;
};

export async function DELETE(
  request: NextRequest,
  { params }: CartProductParams,
): Promise<NextResponse<CartProductResponseDelete>> {
  // Get the token from the cookie

  const sessionTokenCookie = await getCookie('sessionToken');
  const cookieStore = cookies();
  const productId = Number((await params).productId);

  if (!sessionTokenCookie) {
    const guestCartItems = parseGuestCartCookie(cookieStore.get('guestCart')?.value);
    const updatedGuestCart = removeGuestCartItem(guestCartItems, productId);

    const response = NextResponse.json({ success: true });

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

  // Remove product
  const product =
    sessionTokenCookie &&
    (await removeCartProducts(
      sessionTokenCookie,
      productId,
    ));

  if (!product) {
    return NextResponse.json(
      {
        error: 'Product not found',
      },
      {
        status: 400,
      },
    );
  }
  return NextResponse.json({ success: true });
}
