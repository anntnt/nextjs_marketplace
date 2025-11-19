import { type NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const getStripeClient = () => {
  const apiKey = process.env.STRIPE_SECRET_KEY;
  if (!apiKey) {
    console.warn('Stripe API key is not configured. Payment intent endpoint disabled.');
    return null;
  }

  return new Stripe(apiKey);
};

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
    const stripe = getStripeClient();
    if (!stripe) {
      return NextResponse.json(
        {
          errors: [
            {
              message: 'Stripe integration is not configured. Please try again later.',
            },
          ],
        },
        { status: 500 },
      );
    }
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
    console.error('Stripe payment intent error:', error);
    const message =
      error instanceof Error
        ? error.message
        : 'Something went wrong while creating the payment intent';

    return NextResponse.json(
      {
        errors: [
          {
            message,
          },
        ],
      },
      {
        status: 400,
      },
    );
  }
}
