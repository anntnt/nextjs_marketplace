import { NextRequest, NextResponse } from 'next/server';
import { type Product, removeProduct } from '../../../../database/products';
import { getCookie } from '../../../util/cookies';

export type CartProductResponseDelete =
  | {
      product: Product;
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
    (await removeProduct(Number((await params).productId), sessionTokenCookie));

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
