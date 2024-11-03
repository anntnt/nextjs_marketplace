'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import type { date } from 'zod';
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
  const [birthDate, setBirthDate] = useState('');
  const [gender, setGender] = useState('');
  const [userAddress, setUserAddress] = useState('');
  const [errors, setErrors] = useState<{ message: string }[]>([]);

  const router = useRouter();

  async function handleRegister(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const response = await fetch('api/register', {
      method: 'POST',
      body: JSON.stringify({
        username,
        password,
      }),
    });

    const data: RegisterResponseBody = await response.json();

    if ('errors' in data) {
      setErrors(data.errors);
      return;
    }

    // router.push(`/profile/${data.user.username}`);

    // This is not a secure returnTo
    // if (props.returnTo) {
    //   console.log('Checks Return to: ', props.returnTo);
    //   router.push(props.returnTo || `/profile/${data.user.username}`);
    // }

    router.push(
      getSafeReturnToPath(props.returnTo) || `/profile/${data.user.username}`,
    );

    router.refresh();
  }

  return (
    <div>
      <form onSubmit={async (event) => await handleRegister(event)}>
        <label>
          Username
          <input
            value={username}
            required
            onChange={(event) => setUsername(event.currentTarget.value)}
          />
        </label>

        <label>
          Password
          <input
            type="password"
            value={password}
            required
            onChange={(event) => setPassword(event.currentTarget.value)}
          />
        </label>
        <label>
          First name
          <input
            value={firstName}
            onChange={(event) => setFirstName(event.currentTarget.value)}
          />
        </label>
        <label>
          Last name
          <input
            value={lastName}
            onChange={(event) => setLastName(event.currentTarget.value)}
          />
        </label>
        <label>
          Email address
          <input
            value={emailAddress}
            type="email"
            onChange={(event) => setEmailAddress(event.currentTarget.value)}
          />
        </label>
        <label>
          Birth date
          <input
            value={birthDate}
            type="date"
            onChange={(event) => setBirthDate(event.currentTarget.value)}
          />
        </label>
        <label>
          Gender
          <input
            value={gender}
            onChange={(event) => setGender(event.currentTarget.value)}
          />
        </label>
        <label>
          Address
          <input
            value={userAddress}
            onChange={(event) => setUserAddress(event.currentTarget.value)}
          />
        </label>

        <button>Register</button>

        {errors.map((error) => (
          <div className="error" key={`error-${error.message}`}>
            <ErrorMessage>{error.message}</ErrorMessage>
          </div>
        ))}
      </form>
    </div>
  );
}
