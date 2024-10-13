'use client';

import { useRouter } from 'next/navigation';
// import { useRouter } from 'next/router';
import { useState } from 'react';
import emptyCart from './action';

// import styles from './checkoutForm.scss';

export default function CheckoutForm() {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('austria');
  const [creditCard, setCreditCard] = useState('');
  const [expiration, setExpiration] = useState('');
  const [securityCode, setSecurityCode] = useState('');
  const router = useRouter();

  async function oderHandler() {
    await emptyCart();
    router.push('/thank-you');
  }

  return (
    <div>
      <form>
        <label>
          First Name:
          <input
            name="firstname"
            placeholder="First name.."
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            data-test-id="checkout-first-name"
            required
          />
        </label>
        <label>
          Last Name:
          <input
            name="lastname"
            placeholder="Last name.."
            data-test-id="checkout-last-name"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            required
          />
        </label>
        <label>
          Email address:
          <input
            name="email"
            type="email"
            placeholder="Email address.."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            data-test-id="checkout-email"
            required
          />
        </label>
        <label>
          Address:
          <input
            name="address"
            placeholder="Address.."
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            data-test-id="checkout-address"
            required
          />
        </label>
        <label>
          City:
          <input
            name="city"
            placeholder="City.."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            data-test-id="checkout-city"
            required
          />
        </label>
        <label>
          Postal code:
          <input
            name="postalCode"
            placeholder="Postal code.."
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            data-test-id="checkout-postal-code"
            required
          />
        </label>
        <label>
          Country:
          <select
            data-test-id="checkout-country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          >
            <option value="austria">Austria</option>
            <option value="germany">Germany</option>
            <option value="switzerland">Switzerland</option>
          </select>
        </label>
        <label>
          Credit card:
          <input
            name="credit_card"
            placeholder="Credit card.."
            value={creditCard}
            onChange={(e) => setCreditCard(e.target.value)}
            data-test-id="checkout-credit-card"
            required
          />
        </label>
        <label>
          Expiration date:
          <input
            name="expiration_date"
            placeholder="Expiration date.."
            value={expiration}
            onChange={(e) => setExpiration(e.target.value)}
            data-test-id="checkout-expiration-date"
            required
          />
        </label>
        <label>
          Security code:
          <input
            name="security_code"
            placeholder="Security code.."
            value={securityCode}
            onChange={(e) => setSecurityCode(e.target.value)}
            data-test-id="checkout-security-code"
            required
          />
        </label>
        <button
          formAction={() => oderHandler()}
          data-test-id="checkout-confirm-order"
        >
          Confirm Order
        </button>
      </form>
    </div>
  );
}
