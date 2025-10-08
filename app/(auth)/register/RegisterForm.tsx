'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { getSafeReturnToPath } from '../../../util/validation';
import ErrorMessage from '../../ErrorMessage';
import type { RegisterResponseBody } from '../api/register/route';

type Props = { returnTo?: string | string[] };

export default function RegisterForm(props: Props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [birthday, setBirthday] = useState('');
  const [gender, setGender] = useState('');

  const [roleId, setRoleId] = useState(3);
  const [storeName, setStoreName] = useState('');
  const [uAddress, setUAddress] = useState('');

  const [errors, setErrors] = useState<{ message: string }[]>([]);

  const router = useRouter();
  const pathname = usePathname();

  async function handleRegister(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const response = await fetch('api/register', {
      method: 'POST',
      body: JSON.stringify({
        username,
        password,
        firstName,
        lastName,
        emailAddress,
        birthday,
        gender,
        storeName,
        uAddress,
        roleId,
      }),
    });

    const data: RegisterResponseBody = await response.json();

    if ('errors' in data) {
      setErrors(data.errors);
      return;
    }

    if (data.user.roleId === 3) {
      const safeReturnTo = getSafeReturnToPath(props.returnTo);
      const fallbackPath = pathname && pathname !== '/register' ? pathname : '/';
      const target = safeReturnTo && safeReturnTo !== '/register' ? safeReturnTo : fallbackPath;
      router.push(target);
    } else {
      router.push(`/profile/${data.user.username}`);
    }

    router.refresh();
  }

  const handleRoleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRoleId(Number(event.target.value));
  };
  return (
    <>
      <div className="mx-auto max-w-sm text-brand-text dark:text-dark-text">
        <hr className="mb-4" />
        <h2 className="mb-4 text-md text-center">Be part of eStores! </h2>
        <div className="text-sm text-brand-muted dark:text-dark-muted">
          Sign up as a <strong>buyer</strong> to explore and shop for amazing
          products, or join as a <strong>seller</strong> to showcase your items
          and reach more customers.
        </div>
        <form
          onSubmit={async (event) => await handleRegister(event)}
          className="py-8"
        >
          <div className="mb-5 flex items-center gap-4">
            <span>Start</span>
            <input
              type="radio"
              id="buyer"
              name="roleId"
              value="3"
              checked={roleId === 3}
              onChange={handleRoleChange}
              required
            />
            <label htmlFor="buyer">Shopping</label>
            <span>or</span>
            <input
              type="radio"
              id="seller"
              name="roleId"
              value="2"
              checked={roleId === 2}
              onChange={handleRoleChange}
            />
            <label htmlFor="seller">Selling</label>
          </div>
          <hr className="mb-4" />

          <div className="mb-5">
            <label
              htmlFor="username"
              className="block mb-2 text-sm font-medium text-brand-text dark:text-dark-text"
            >
              Username*
              <input
                className="block w-full rounded-lg border border-brand-muted/30 bg-brand-surface p-2.5 text-sm text-brand-text placeholder:text-brand-muted transition focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/40 dark:border-dark-muted/40 dark:bg-dark-surface dark:text-dark-text dark:placeholder:text-dark-muted dark:focus:border-brand-primary dark:focus:ring-brand-primary/40"
                required
                value={username}
                onChange={(event) => setUsername(event.currentTarget.value)}
              />
            </label>
          </div>
          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-brand-text dark:text-dark-text">
              Password*
              <input
                type="password"
                value={password}
                required
                onChange={(event) => setPassword(event.currentTarget.value)}
                className="block w-full rounded-lg border border-brand-muted/30 bg-brand-surface p-2.5 text-sm text-brand-text placeholder:text-brand-muted transition focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/40 dark:border-dark-muted/40 dark:bg-dark-surface dark:text-dark-text dark:placeholder:text-dark-muted dark:focus:border-brand-primary dark:focus:ring-brand-primary/40"
              />
            </label>
          </div>
          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-brand-text dark:text-dark-text">
              First name*
              <input
                value={firstName}
                onChange={(event) => setFirstName(event.currentTarget.value)}
                required
                className="block w-full rounded-lg border border-brand-muted/30 bg-brand-surface p-2.5 text-sm text-brand-text placeholder:text-brand-muted transition focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/40 dark:border-dark-muted/40 dark:bg-dark-surface dark:text-dark-text dark:placeholder:text-dark-muted dark:focus:border-brand-primary dark:focus:ring-brand-primary/40"
              />
            </label>
          </div>
          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-brand-text dark:text-dark-text">
              Last name*
              <input
                value={lastName}
                onChange={(event) => setLastName(event.currentTarget.value)}
                required
                className="block w-full rounded-lg border border-brand-muted/30 bg-brand-surface p-2.5 text-sm text-brand-text placeholder:text-brand-muted transition focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/40 dark:border-dark-muted/40 dark:bg-dark-surface dark:text-dark-text dark:placeholder:text-dark-muted dark:focus:border-brand-primary dark:focus:ring-brand-primary/40"
              />
            </label>
          </div>
          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-brand-text dark:text-dark-text">
              Email address*
              <input
                value={emailAddress}
                type="email"
                onChange={(event) => setEmailAddress(event.currentTarget.value)}
                required
                className="block w-full rounded-lg border border-brand-muted/30 bg-brand-surface p-2.5 text-sm text-brand-text placeholder:text-brand-muted transition focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/40 dark:border-dark-muted/40 dark:bg-dark-surface dark:text-dark-text dark:placeholder:text-dark-muted dark:focus:border-brand-primary dark:focus:ring-brand-primary/40"
              />
            </label>
          </div>
          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-brand-text dark:text-dark-text">
              Birth date*
              <input
                value={birthday}
                type="date"
                onChange={(event) => setBirthday(event.currentTarget.value)}
                required
                className="block w-full rounded-lg border border-brand-muted/30 bg-brand-surface p-2.5 text-sm text-brand-text placeholder:text-brand-muted transition focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/40 dark:border-dark-muted/40 dark:bg-dark-surface dark:text-dark-text dark:placeholder:text-dark-muted dark:focus:border-brand-primary dark:focus:ring-brand-primary/40"
              />
            </label>
          </div>
          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-brand-text dark:text-dark-text">
              Gender
              <select
                id="countries"
                value={gender}
                onChange={(event) => setGender(event.currentTarget.value)}
                className="block w-full rounded-lg border border-brand-muted/30 bg-brand-surface p-2.5 text-sm text-brand-text placeholder:text-brand-muted transition focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/40 dark:border-dark-muted/40 dark:bg-dark-surface dark:text-dark-text dark:placeholder:text-dark-muted dark:focus:border-brand-primary dark:focus:ring-brand-primary/40"
              >
                <option>Please select one...</option>
                <option value="female">female</option>
                <option value="male">male</option>
                <option value="other">other</option>
              </select>
            </label>
          </div>

          {roleId === 2 && (
            <div className="mb-5">
              <label className="block mb-2 text-sm font-medium text-brand-text dark:text-dark-text">
                Store name
                <input
                  value={storeName}
                  onChange={(event) => setStoreName(event.currentTarget.value)}
                  className="block w-full rounded-lg border border-brand-muted/30 bg-brand-surface p-2.5 text-sm text-brand-text placeholder:text-brand-muted transition focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/40 dark:border-dark-muted/40 dark:bg-dark-surface dark:text-dark-text dark:placeholder:text-dark-muted dark:focus:border-brand-primary dark:focus:ring-brand-primary/40"
                />
              </label>
            </div>
          )}
          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-brand-text dark:text-dark-text">
              Address
              <input
                value={uAddress}
                onChange={(event) => setUAddress(event.currentTarget.value)}
                className="block w-full rounded-lg border border-brand-muted/30 bg-brand-surface p-2.5 text-sm text-brand-text placeholder:text-brand-muted transition focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/40 dark:border-dark-muted/40 dark:bg-dark-surface dark:text-dark-text dark:placeholder:text-dark-muted dark:focus:border-brand-primary dark:focus:ring-brand-primary/40"
              />
            </label>
          </div>

          <div className="mb-5">
            <div className="flex items-center">
              <input
                id="privacyAgreement"
                type="checkbox"
                required
                className="h-4 w-4 rounded border-brand-muted/40 text-brand-primary focus:ring-2 focus:ring-brand-primary/50 dark:border-dark-muted/40 dark:bg-dark-surface"
              />
              <label
                htmlFor="privacyAgreement"
                className="ms-2 text-sm font-medium text-brand-text dark:text-dark-text"
              >
                I agree to the Privacy Policy*
              </label>
            </div>
          </div>
          <div className="mb-5">
            <button className="mb-2 me-2 w-full rounded-lg border border-brand-warning bg-brand-warning px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#d97706] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary/70">
              Register
            </button>
          </div>
          <div className="mb-5">
            {errors.map((error) => (
              <div className="error" key={`error-${error.message}`}>
                <ErrorMessage>{error.message}</ErrorMessage>
              </div>
            ))}
          </div>
        </form>
      </div>
      <div className="mx-auto max-w-lg text-center text-lg text-brand-text dark:text-dark-text">
        <hr className="mb-4" />
        <div className="text-center text-brand-muted dark:text-dark-muted">
          Already have an account?
        </div>
        <Link
          href="/login"
          className="font-semibold text-brand-primary underline underline-offset-2 transition-colors hover:text-brand-secondary focus:text-brand-secondary active:text-brand-secondary dark:text-brand-primary"
        >
          Log in
        </Link>{' '}
        to shop or sell now!
      </div>
    </>
  );
}
