import { NextRequest, NextResponse } from 'next/server';
import {
  type CartProductWithAllFields,
  removeCartProducts,
} from '../../../../database/cartProducts';
import { getCookie } from '../../../../util/cookies';

export type CartProductResponseDelete =
  | {
      product: CartProductWithAllFields;
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

  // Remove product
  const product =
    sessionTokenCookie &&
    (await removeCartProducts(
      sessionTokenCookie,
      Number((await params).productId),
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
  return NextResponse.json({ product: product });
}
