'use client';
import './stripe.css';
import {
  PaymentElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import type { CreatePaymentResponseBodyPost } from '../../api/stripe/create-payment-intent/route';
import ErrorMessage from '../../ErrorMessage';

/* type StripeError = {
  type: string;
  message: string;
}; */

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<{ message: string }[]>([]);

  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);
    const host = window.location.host;
    let baseUrl;
    if (host.includes('localhost')) {
      baseUrl = `http://${host}`;
    } else {
      baseUrl = `https://${host}`;
    }

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: `${baseUrl}/thank-you`,
      },
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === 'card_error' || error.type === 'validation_error') {
      setMessage(error.message ?? 'An error occurred with the payment.');
    } else {
      setMessage(`An unexpected error occurred. ${error.type}`);
    }

    setIsLoading(false);
  };

  return (
    <>
      <form id="payment-form" className="mx-auto" onSubmit={handleSubmit}>
        <PaymentElement id="payment-element" />
        <button
          className="space-x-4 text-white bg-blue-1000 hover:bg-blue-700 hover:text-white focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm  px-5 py-2.5 me-2  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          disabled={isLoading || !stripe || !elements}
          id="submit"
          onClick={async () => {
            const response = await fetch(`/api/cart-items`, {
              method: 'DELETE',
            });

            if (!response.ok) {
              const responseBody: CreatePaymentResponseBodyPost =
                await response.json();

              if ('errors' in responseBody) {
                setErrors(responseBody.errors);
                return;
              }

              return;
            }

            router.refresh();
          }}
        >
          <span id="button-text">
            {isLoading ? <div className="spinner" id="spinner" /> : 'Pay now'}
          </span>
        </button>
        {/* Show any error or success messages */}
        {message && <div id="payment-message">{message}</div>}
      </form>
      {/* [DEV]: For demo purposes only, display dynamic payment methods annotation and integration checker */}
      <div id="dpm-annotation">
        <div className="mb-5">
          {errors.map((error) => (
            <div className="error" key={`error-${error.message}`}>
              <ErrorMessage>{error.message}</ErrorMessage>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
