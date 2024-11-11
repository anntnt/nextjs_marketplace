import { redirect } from 'next/navigation';
import { NextResponse } from 'next/server';
import { type CartSum, getCartSum } from '../../../database/cartProducts';
import { getCookie } from '../../../util/cookies';

export type CartItemsResponse =
  | {
      cartSum: {
        totalamount: CartSum['totalamount'];
      };
      //cartSum: CartSum;
    }
  | {
      error: string;
    };

export async function GET(
  request: Request,
): Promise<NextResponse<CartItemsResponse>> {
  // 1. Get the token from the cookie
  const sessionTokenCookie = await getCookie('sessionToken');
  console.log('sessionTokenCookie: ' + sessionTokenCookie);

  // If no session token, return an error
  if (!sessionTokenCookie) {
    return NextResponse.json(
      {
        cartSum: { totalamount: '0' },
      },
      {
        status: 200, // Unauthorized
      },
    );
  }

  // 2. Try to fetch the cart sum using the session token
  const cartSumResult = await getCartSum(sessionTokenCookie);

  // 3. If the cart's total amount can't be read, return an error
  if (!cartSumResult) {
    return NextResponse.json(
      {
        error: "Cart's total amount can't be read",
      },
      {
        status: 400, // Bad Request
      },
    );
  }

  // 4. Return the cart sum (totalAmount) in the response
  /*return NextResponse.json({
    cartSum: { totalAmount: cartSumResult.totalAmount },
  });*/
  return NextResponse.json({ cartSum: cartSumResult });
}
