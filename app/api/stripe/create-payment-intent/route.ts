import { type NextRequest, NextResponse } from 'next/server';
// This is test secret API key.
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export type CreatePaymentResponseBodyPost =
  | {
      clientSecret: string | null;
      dpmCheckerLink: string;
    }
  | {
      errors: { message: string }[];
    };
export async function POST(
  request: NextRequest,
): Promise<NextResponse<CreatePaymentResponseBodyPost>> {
  try {
    await request.json();
    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 450,
      currency: 'eur',

      automatic_payment_methods: {
        enabled: true,
      },
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      // [DEV]: For demo purposes only
      dpmCheckerLink: `https://dashboard.stripe.com/settings/payment_methods/review?transaction_id=${paymentIntent.id}`,
    });
  } catch (error) {
    console.error('Internal Error:', error);
    // Handle other errors (e.g., network issues, parsing errors)
    return NextResponse.json(
      {
        errors: [
          {
            message: 'Username or Password is invalid',
          },
        ],
      },
      {
        status: 400,
      },
    );
  }
}
