'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
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

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const response = await fetch('api/login', {
      method: 'POST',
      body: JSON.stringify({
        username,
        password,
      }),
    });

    const data: LoginResponseBody = await response.json();

    if ('errors' in data) {
      setErrors(data.errors);
      return;
    }

    router.push(
      getSafeReturnToPath(props.returnTo) || `/profile/${data.user.username}`,
    );

    router.refresh();
  }

  return (
    <>
      <div className="max-w-sm mx-auto">
        <form
          className="py-8"
          onSubmit={async (event) => await handleLogin(event)}
        >
          <div className="mb-5">
            <label
              htmlFor="username"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your username
            </label>
            <input
              id="username"
              className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-1000 focus:border-blue-1000 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-1000 dark:focus:border-blue-1000"
              required
              value={username}
              onChange={(event) => setUsername(event.currentTarget.value)}
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your password
            </label>
            <input
              id="password"
              type="password"
              className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-1000 focus:border-blue-1000 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-1000 dark:focus:border-blue-1000"
              required
              value={password}
              onChange={(event) => setPassword(event.currentTarget.value)}
            />
          </div>
          <div className="mb-5">
            <button className="text-white bg-blue-1000 hover:bg-blue-700 hover:text-white focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
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
      <div className="max-w-lg mx-auto text-center  text-lg">
        <hr className="mb-4" />
        <div className=" text-black dark:text-white text-center">
          New to eStores?
        </div>
        <Link
          href="/register"
          className="underline text-black dark:text-white hover:text-blue-1000 active:text-blue-1000 focus:text-blue-1000 font-semibold dark:hover:bg-gray-600 dark:hover:text-white text-center"
        >
          Sign up
        </Link>{' '}
        as a <strong>customer</strong> or <strong>seller</strong>&nbsp; and
        start exploring!
      </div>
    </>
  );
}
