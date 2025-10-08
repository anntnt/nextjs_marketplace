'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { getSafeReturnToPath } from '../../../util/validation';
import ErrorMessage from '../../ErrorMessage';
import type { LoginResponseBody } from '../api/login/route';

type Props = { returnTo?: string | string[] };

export default function LoginForm(props: Props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ message: string }[]>([]);

  const router = useRouter();
  const pathname = usePathname();

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        username,
        password,
      }),
    });

    if (!response.ok) {
      try {
        const errorBody = (await response.json()) as LoginResponseBody;
        if ('errors' in errorBody) {
          setErrors(errorBody.errors);
        } else {
          setErrors([{ message: 'Unable to login. Please try again.' }]);
        }
      } catch {
        setErrors([{ message: 'Unable to login. Please try again.' }]);
      }
      return;
    }

    const data: LoginResponseBody = await response.json();

    if ('errors' in data) {
      setErrors(data.errors);
      return;
    }

    const safeReturnTo = getSafeReturnToPath(props.returnTo);
    const fallbackPath = pathname && pathname !== '/login' ? pathname : '/';
    const target = safeReturnTo && safeReturnTo !== '/login' ? safeReturnTo : fallbackPath;

    if (data.user.roleId === 2 || data.user.roleId === 3) {
      router.push(target);
    } else {
      router.push(`/profile/${data.user.username}`);
    }

    router.refresh();
  }

  return (
    <>
      <div className="mx-auto max-w-sm text-brand-text dark:text-dark-text">
        <form
          className="py-8"
          onSubmit={async (event) => await handleLogin(event)}
        >
          <div className="mb-5">
            <label
              htmlFor="username"
              className="mb-2 block text-sm font-medium text-brand-text dark:text-dark-text"
            >
              Your username
            </label>
            <input
              id="username"
              className="block w-full rounded-lg border border-brand-muted/30 bg-brand-surface p-2.5 text-sm text-brand-text placeholder:text-brand-muted transition focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/40 dark:border-dark-muted/40 dark:bg-dark-surface dark:text-dark-text dark:placeholder:text-dark-muted dark:focus:border-brand-primary dark:focus:ring-brand-primary/40"
              required
              value={username}
              onChange={(event) => setUsername(event.currentTarget.value)}
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-brand-text dark:text-dark-text"
            >
              Your password
            </label>
            <input
              id="password"
              type="password"
              className="block w-full rounded-lg border border-brand-muted/30 bg-brand-surface p-2.5 text-sm text-brand-text placeholder:text-brand-muted transition focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/40 dark:border-dark-muted/40 dark:bg-dark-surface dark:text-dark-text dark:placeholder:text-dark-muted dark:focus:border-brand-primary dark:focus:ring-brand-primary/40"
              required
              value={password}
              onChange={(event) => setPassword(event.currentTarget.value)}
            />
          </div>
          <div className="mb-5">
            <button className="mb-2 me-2 w-full rounded-lg border border-brand-warning bg-brand-warning px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#d97706] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary/70">
              Login
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
          New to eStores?
        </div>
        <Link
          href="/register"
          className="font-semibold text-brand-primary underline underline-offset-2 transition-colors hover:text-brand-secondary focus:text-brand-secondary active:text-brand-secondary dark:text-brand-primary"
        >
          Sign up
        </Link>{' '}
        as a <strong>buyer</strong> or <strong>seller</strong>&nbsp; and
        start exploring!
      </div>
    </>
  );
}
