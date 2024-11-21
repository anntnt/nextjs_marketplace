'use client';
import './stripe.css';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import CheckoutForm from './CheckoutForm';
import CompletePage from './CompletePage';

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
);
export default function StripeComponent() {
  const [clientSecret, setClientSecret] = React.useState('');
  const [dpmCheckerLink, setDpmCheckerLink] = React.useState('');
  const [confirmed, setConfirmed] = React.useState(false);
  React.useEffect(() => {
    const paymentIntentClientSecret = new URLSearchParams(
      window.location.search,
    ).get('payment_intent_client_secret');

    // Set state to true if the value exists, otherwise false
    setConfirmed(paymentIntentClientSecret !== null);
  });

  React.useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch('/api/stripe/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: [{ id: 'xl-tshirt' }] }),
    })
      .then((res) => res.json())
      .then((data) => {
        setClientSecret(data.clientSecret);
        // [DEV] For demo purposes only
        setDpmCheckerLink(data.dpmCheckerLink);
      });
  }, []);

  const options = {
    clientSecret: clientSecret,
    theme: 'stripe',
  };
  return (
    <div className="App">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          {confirmed ? (
            <CompletePage />
          ) : (
            <CheckoutForm dpmCheckerLink={dpmCheckerLink} />
          )}
        </Elements>
      )}
    </div>
  );
}
