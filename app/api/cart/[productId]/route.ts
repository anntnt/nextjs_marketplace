import { NextRequest, NextResponse } from 'next/server';
import {
  type ProductFromCart,
  removeCartProducts,
} from '../../../../database/cartProducts';
import { getCookie } from '../../../../util/cookies';

export type CartProductResponseDelete =
  | {
      product: ProductFromCart;
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
  // 3. Get the token from the cookie

  const sessionTokenCookie = await getCookie('sessionToken');

  // 4. Remove product
  const product =
    sessionTokenCookie &&
    (await removeCartProducts(
      sessionTokenCookie,
      Number((await params).productId),
    ));

  console.log('product', product);
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
