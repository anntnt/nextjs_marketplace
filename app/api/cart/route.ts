import { NextResponse } from 'next/server';
import {
  type CartProduct,
  cartProductSchema,
  createCartProduct,
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
  // Task: Create a note for the current logged in user
  // 1. Get the note data from the request
  const body = await request.json();

  // 2. Validate notes data with zod
  const result = cartProductSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      { error: 'Request does not contain cartProduct object' },
      {
        status: 400,
      },
    );
  }

  // 3. Get the token from the cookie
  const sessionTokenCookie = await getCookie('sessionToken');

  // 4. Create the note
  const newCartProduct =
    sessionTokenCookie &&
    (await createCartProduct(
      sessionTokenCookie,
      result.data.productId,
      result.data.amount,
    ));

  // 5. If the note creation fails, return an error
  if (!newCartProduct) {
    return NextResponse.json(
      { error: 'cartProduct not created or access denied creating note' },
      {
        status: 400,
      },
    );
  }

  // 6. Return the text content of the note
  return NextResponse.json({
    cartProduct: { productId: newCartProduct.productId },
  });
}
