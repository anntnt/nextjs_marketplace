'use client';
import { type SetStateAction, useState } from 'react';
import StripeForm from './stripe/StripeForm';

export default function PaymentForm() {
  const [paymentType, setPaymentType] = useState('credit-card');
  const handlePaymentTypeChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setPaymentType(event.target.value);
  };
  return (
    <div>
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-brand-text dark:text-white">
          Payment
        </h2>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-lg border border-brand-border bg-brand-surface p-4 ps-4 dark:border-dark-muted/60 dark:bg-dark-surface">
            <div className="flex items-start">
              <div className="flex h-5 items-center">
                <input
                  id="credit-card"
                  aria-describedby="credit-card-text"
                  type="radio"
                  name="payment-method"
                  checked={paymentType === 'credit-card'}
                  onChange={handlePaymentTypeChange}
                  value="credit-card"
                  className="h-4 w-4 border-gray-300 bg-white text-primary-600 focus:ring-2 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600"
                />
              </div>

              <div className="ms-4 text-sm">
                <label className="font-medium leading-none text-brand-text dark:text-white">
                  {' '}
                  Credit Card{' '}
                </label>
                <p
                  id="credit-card-text"
                  className="mt-1 text-xs font-normal text-brand-muted dark:text-dark-muted"
                >
                  Pay with your credit card
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-brand-border bg-brand-surface p-4 ps-4 dark:border-dark-muted/60 dark:bg-dark-surface">
            <div className="flex items-start">
              <div className="flex h-5 items-center">
                <input
                  id="pay-on-delivery"
                  aria-describedby="pay-on-delivery-text"
                  type="radio"
                  name="payment-method"
                  checked={paymentType === 'pay-on-delivery'}
                  onChange={handlePaymentTypeChange}
                  value="pay-on-delivery"
                  className="h-4 w-4 border-gray-300 bg-white text-primary-600 focus:ring-2 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600"
                />
              </div>

              <div className="ms-4 text-sm">
                <label className="font-medium leading-none text-brand-text dark:text-white">
                  {' '}
                  Payment on delivery{' '}
                </label>
                <p
                  id="pay-on-delivery-text"
                  className="mt-1 text-xs font-normal text-brand-muted dark:text-dark-muted"
                />
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-brand-border bg-brand-surface p-4 ps-4 dark:border-dark-muted/60 dark:bg-dark-surface">
            <div className="flex items-start">
              <div className="flex h-5 items-center">
                <input
                  id="paypal"
                  aria-describedby="paypal-text"
                  type="radio"
                  name="payment-method"
                  checked={paymentType === 'paypal'}
                  value="paypal"
                  onChange={handlePaymentTypeChange}
                  className="h-4 w-4 border-gray-300 bg-white text-primary-600 focus:ring-2 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600"
                />
              </div>

              <div className="ms-4 text-sm">
                <label className="font-medium leading-none text-brand-text dark:text-white">
                  {' '}
                  Paypal account{' '}
                </label>
                <p
                  id="paypal-text"
                  className="mt-1 text-xs font-normal text-brand-muted dark:text-dark-muted"
                >
                  Connect to your account
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {paymentType === 'credit-card' && <StripeForm />}
        {paymentType === 'pay-on-delivery' && (
          <div className="grid py-4 text-center font-normal text-brand-muted dark:text-dark-muted">
            {' '}
            <i>
              This payment is currently in progress. Please check back later.
            </i>{' '}
          </div>
        )}
        {paymentType === 'paypal' && (
          <div className="grid py-4 text-center font-normal text-brand-muted dark:text-dark-muted">
            {' '}
            <i>
              This payment is currently in progress. Please check back later.
            </i>{' '}
          </div>
        )}
      </div>
    </div>
  );
}
