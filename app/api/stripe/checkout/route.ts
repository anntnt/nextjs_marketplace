import { type NextRequest, NextResponse } from 'next/server';

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function POST(request: NextRequest) {
  try {
    // Create Checkout Sessions from body params.
    const checkoutSession = await stripe.checkout.sessions.create({
      line_items: [
        {
          // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
          price: 'price_1QNKkJRumwBJZ6dzFinWiYfX',
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `/thank-you`,
      cancel_url: `/error`,
    });
    return NextResponse.json({ result: checkoutSession, ok: true });
  } catch (error) {
    console.log(error);
    return new NextResponse('Internal Server', { status: 500 });
  }
}
