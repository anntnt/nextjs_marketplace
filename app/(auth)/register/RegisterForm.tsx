'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
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
  const [isSellerChecked, setIsSellerChecked] = useState(false);
  const [roleId, setRoleId] = useState(3);
  const [storeName, setStoreName] = useState('');
  const [uAddress, setUAddress] = useState('');

  const [errors, setErrors] = useState<{ message: string }[]>([]);

  const router = useRouter();

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

    router.push(
      getSafeReturnToPath(props.returnTo) || `/profile/${data.user.username}`,
    );

    router.refresh();
  }

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsSellerChecked(event.target.checked);
    if (event.target.checked) {
      setRoleId(2);
    } else {
      setRoleId(3);
    }
  };

  return (
    <>
      <div className="max-w-sm mx-auto">
        <form
          onSubmit={async (event) => await handleRegister(event)}
          className="py-8"
        >
          <div className="mb-5">
            <label
              htmlFor="username"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Username*
              <input
                className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-1000 focus:border-blue-1000 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-1000 dark:focus:border-blue-1000"
                required
                value={username}
                onChange={(event) => setUsername(event.currentTarget.value)}
              />
            </label>
          </div>
          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Password*
              <input
                type="password"
                value={password}
                required
                onChange={(event) => setPassword(event.currentTarget.value)}
                className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-1000 focus:border-blue-1000 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-1000 dark:focus:border-blue-1000"
              />
            </label>
          </div>
          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              First name*
              <input
                value={firstName}
                onChange={(event) => setFirstName(event.currentTarget.value)}
                required
                className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-1000 focus:border-blue-1000 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-1000 dark:focus:border-blue-1000"
              />
            </label>
          </div>
          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Last name*
              <input
                value={lastName}
                onChange={(event) => setLastName(event.currentTarget.value)}
                required
                className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-1000 focus:border-blue-1000 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-1000 dark:focus:border-blue-1000"
              />
            </label>
          </div>
          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Email address*
              <input
                value={emailAddress}
                type="email"
                onChange={(event) => setEmailAddress(event.currentTarget.value)}
                required
                className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-1000 focus:border-blue-1000 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-1000 dark:focus:border-blue-1000"
              />
            </label>
          </div>
          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Birth date*
              <input
                value={birthday}
                type="date"
                onChange={(event) => setBirthday(event.currentTarget.value)}
                required
                className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-1000 focus:border-blue-1000 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-1000 dark:focus:border-blue-1000"
              />
            </label>
          </div>
          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Gender
              <select
                id="countries"
                value={gender}
                onChange={(event) => setGender(event.currentTarget.value)}
                className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option>Please select one...</option>
                <option value="female">female</option>
                <option value="male">male</option>
                <option value="other">other</option>
              </select>
            </label>
          </div>
          <div className="mb-5">
            <div className="flex items-center">
              <input
                id="applyToSell"
                type="checkbox"
                onChange={handleCheckboxChange}
                className="w-4 h-4 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="applyToSell"
                className="ms-2 text-sm font-medium text-blue-600 "
              >
                <strong>Apply to Sell on eStores</strong>
              </label>
            </div>
          </div>
          {isSellerChecked && (
            <div className="mb-5">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Store name
                <input
                  value={storeName}
                  onChange={(event) => setStoreName(event.currentTarget.value)}
                  className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-1000 focus:border-blue-1000 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-1000 dark:focus:border-blue-1000"
                />
              </label>
            </div>
          )}
          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Address
              <input
                value={uAddress}
                onChange={(event) => setUAddress(event.currentTarget.value)}
                className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-1000 focus:border-blue-1000 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-1000 dark:focus:border-blue-1000"
              />
            </label>
          </div>

          <div className="mb-5">
            <div className="flex items-center">
              <input
                id="privacyAgreement"
                type="checkbox"
                required
                className="w-4 h-4 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="privacyAgreement"
                className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                I agree to the Privacy Policy*
              </label>
            </div>
          </div>
          <div className="mb-5">
            <button className="text-white bg-blue-1000 hover:bg-blue-700 hover:text-white focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
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
      <div className="max-w-lg mx-auto text-center  text-lg">
        <hr className="mb-4" />
        <div className=" text-black dark:text-white text-center">
          Already have an account?
        </div>
        <Link
          href="/login"
          className="underline text-black dark:text-white hover:text-blue-1000 active:text-blue-1000 focus:text-blue-1000 font-semibold dark:hover:bg-gray-600 dark:hover:text-white text-center"
        >
          Log in
        </Link>{' '}
        to shop or sell now!
      </div>
    </>
  );
}
