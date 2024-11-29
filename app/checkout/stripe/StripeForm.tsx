'use client';
import './stripe.css';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useEffect, useState } from 'react';
import type { CreatePaymentResponseBodyPost } from '../../api/stripe/create-payment-intent/route';
import ErrorMessage from '../../ErrorMessage';
import CheckoutForm from './CheckoutForm';
import CompletePage from './CompletePage';

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
);

export default function StripeComponent() {
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  const [confirmed, setConfirmed] = useState(false);
  const [errors, setErrors] = useState<{ message: string }[]>([]);
  useEffect(() => {
    const paymentIntentClientSecret = new URLSearchParams(
      window.location.search,
    ).get('payment_intent_client_secret');

    // Set state to true if the value exists, otherwise false
    setConfirmed(paymentIntentClientSecret !== null);
  }, []);

  useEffect(() => {
    const createPaymentIntent = async () => {
      try {
        const res = await fetch('/api/stripe/create-payment-intent', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ items: [{ id: 'xl-tshirt' }] }),
        });

        if (!res.ok) {
          throw new Error('Failed to create PaymentIntent');
        }

        const data: CreatePaymentResponseBodyPost = await res.json();
        if ('errors' in data) {
          setErrors(data.errors);
          return;
        }
        setClientSecret(data.clientSecret);
      } catch (error) {
        console.error('Error creating PaymentIntent:', error);
        // Optionally handle the error, e.g., set an error state.
      }
    };

    createPaymentIntent().catch(console.error); // Call the async function
  }, []); // Empty dependency array, runs once when the component mounts.

  const options = {
    clientSecret: clientSecret || undefined,
    theme: 'stripe',
  };
  return (
    <div className="grid py-6">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          {confirmed ? <CompletePage /> : <CheckoutForm />}
        </Elements>
      )}
      <div className="mb-5">
        {errors.map((error) => (
          <div className="error" key={`error-${error.message}`}>
            <ErrorMessage>{error.message}</ErrorMessage>
          </div>
        ))}
      </div>
    </div>
  );
}
