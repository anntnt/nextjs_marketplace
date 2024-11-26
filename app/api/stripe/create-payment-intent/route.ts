import { type NextRequest, NextResponse } from 'next/server';
// This is your test secret API key.
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export type CreatePaymentResponseBodyPost =
  | {
      clientSecret: string | null;
      dpmCheckerLink: string;
    }
  | {
      error: string;
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
      // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
      automatic_payment_methods: {
        enabled: true,
      },
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      // [DEV]: For demo purposes only, you should avoid exposing the PaymentIntent ID in the client-side code.
      dpmCheckerLink: `https://dashboard.stripe.com/settings/payment_methods/review?transaction_id=${paymentIntent.id}`,
    });
  } catch (error) {
    console.error('Internal Error:', error);
    // Handle other errors (e.g., network issues, parsing errors)
    return NextResponse.json(
      { error: `Internal Server Error` },
      { status: 500 },
    );
  }
}
