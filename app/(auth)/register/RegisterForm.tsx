'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import { getSafeReturnToPath } from '../../../util/validation';
import ErrorMessage from '../../ErrorMessage';
import type { RegisterResponseBody } from '../api/register/route';

type Props = { returnTo?: string | string[] };

type FieldName =
  | 'username'
  | 'password'
  | 'firstName'
  | 'lastName'
  | 'emailAddress'
  | 'birthday'
  | 'privacyAgreement';

const FIELD_LABELS: Record<FieldName, string> = {
  username: 'Username',
  password: 'Password',
  firstName: 'First name',
  lastName: 'Last name',
  emailAddress: 'Email address',
  birthday: 'Birth date',
  privacyAgreement: 'Privacy Policy agreement',
};

const FIELD_REQUIRED_MESSAGES: Record<FieldName, string> = {
  username: 'Please enter your username.',
  password: 'Please enter your password.',
  firstName: 'Please enter your first name.',
  lastName: 'Please enter your last name.',
  emailAddress: 'Please enter your email address.',
  birthday: 'Please enter your birth date.',
  privacyAgreement: 'Please agree to the Privacy Policy.',
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MINIMUM_AGE = 18;
const MIN_BIRTH_YEAR = 1900;

export default function RegisterForm(props: Props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [birthday, setBirthday] = useState('');
  const [gender, setGender] = useState('');
  const [privacyAgreementAccepted, setPrivacyAgreementAccepted] = useState(false);

  const [roleId, setRoleId] = useState(3);
  const [storeName, setStoreName] = useState('');
  const [uAddress, setUAddress] = useState('');

  const [errors, setErrors] = useState<{ message: string }[]>([]);

  const router = useRouter();
  const pathname = usePathname();

  const { fieldErrors, formErrors } = useMemo(() => {
    const fieldErrorMap: Partial<Record<FieldName, string>> = {};
    const otherErrors: string[] = [];

    for (const { message } of errors) {
      const match = (Object.entries(FIELD_LABELS) as [FieldName, string][]).find(([, label]) =>
        message.toLowerCase().startsWith(label.toLowerCase()),
      );

      if (match) {
        const [field, label] = match;
        const remainder = message.slice(label.length).trim().replace(/^:\s*/, '');
        fieldErrorMap[field] = remainder || message;
        continue;
      }

      otherErrors.push(message);
    }

    return { fieldErrors: fieldErrorMap, formErrors: otherErrors };
  }, [errors]);

  const clearFieldError = (field: FieldName) => {
    setErrors((prev) =>
      prev.filter(
        (error) => !error.message.toLowerCase().startsWith(FIELD_LABELS[field].toLowerCase()),
      ),
    );
  };

  async function handleRegister(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedEmail = emailAddress.trim();
    const requiredFields: Array<{ key: FieldName; value: string }> = [
      { key: 'username', value: username.trim() },
      { key: 'password', value: password.trim() },
      { key: 'firstName', value: firstName.trim() },
      { key: 'lastName', value: lastName.trim() },
      { key: 'emailAddress', value: trimmedEmail },
      { key: 'birthday', value: birthday.trim() },
      { key: 'privacyAgreement', value: privacyAgreementAccepted ? 'true' : '' },
    ];

    const validationErrors: { message: string }[] = [];

    for (const field of requiredFields) {
      if (!field.value) {
        validationErrors.push({
          message: `${FIELD_LABELS[field.key]}: ${FIELD_REQUIRED_MESSAGES[field.key]}`,
        });
      }
    }

    if (trimmedEmail && !EMAIL_PATTERN.test(trimmedEmail)) {
      validationErrors.push({
        message: `${FIELD_LABELS.emailAddress}: Please enter a valid email address.`,
      });
    }

    if (birthday) {
      const parsedBirthDate = new Date(birthday);
      if (Number.isNaN(parsedBirthDate.getTime())) {
        validationErrors.push({
          message: 'Birth date: Please enter a valid date.',
        });
      } else {
        if (parsedBirthDate.getFullYear() < MIN_BIRTH_YEAR) {
          validationErrors.push({
            message: 'Birth date: Please enter a valid date.',
          });
        } else {
          const today = new Date();
          const minimumBirthDate = new Date(
            today.getFullYear() - MINIMUM_AGE,
            today.getMonth(),
            today.getDate(),
          );
          if (parsedBirthDate > minimumBirthDate) {
            validationErrors.push({
              message: 'Birth date: You must be at least 18 years old.',
            });
          }
        }
      }
    }

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors([]);

    const response = await fetch('api/register', {
      method: 'POST',
      body: JSON.stringify({
        username,
        password,
        firstName,
        lastName,
        emailAddress: trimmedEmail,
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

    const safeReturnTo = getSafeReturnToPath(props.returnTo);
    const fallbackPath = pathname && pathname !== '/register' ? pathname : '/';
    const target = safeReturnTo && safeReturnTo !== '/register'
      ? safeReturnTo
      : fallbackPath;

    router.push(target);
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
          noValidate
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
              className="block text-sm font-medium text-brand-text dark:text-dark-text"
            >
              Username*
            </label>
            <input
              id="username"
              className="mt-2 block w-full rounded-lg border border-brand-muted/30 bg-brand-surface p-2.5 text-sm text-brand-text placeholder:text-brand-muted transition focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/40 dark:border-dark-muted/40 dark:bg-dark-surface dark:text-dark-text dark:placeholder:text-dark-muted dark:focus:border-brand-primary dark:focus:ring-brand-primary/40"
              value={username}
              onChange={(event) => {
                clearFieldError('username');
                setUsername(event.currentTarget.value);
              }}
            />
            {fieldErrors.username ? (
              <div className="mt-2">
                <ErrorMessage>{fieldErrors.username}</ErrorMessage>
              </div>
            ) : null}
          </div>
          <div className="mb-5">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-brand-text dark:text-dark-text"
            >
              Password*
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) => {
                clearFieldError('password');
                setPassword(event.currentTarget.value);
              }}
              className="mt-2 block w-full rounded-lg border border-brand-muted/30 bg-brand-surface p-2.5 text-sm text-brand-text placeholder:text-brand-muted transition focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/40 dark:border-dark-muted/40 dark:bg-dark-surface dark:text-dark-text dark:placeholder:text-dark-muted dark:focus:border-brand-primary dark:focus:ring-brand-primary/40"
            />
            {fieldErrors.password ? (
              <div className="mt-2">
                <ErrorMessage>{fieldErrors.password}</ErrorMessage>
              </div>
            ) : null}
          </div>
          <div className="mb-5">
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-brand-text dark:text-dark-text"
            >
              First name*
            </label>
            <input
              id="firstName"
              value={firstName}
              onChange={(event) => {
                clearFieldError('firstName');
                setFirstName(event.currentTarget.value);
              }}
              className="mt-2 block w-full rounded-lg border border-brand-muted/30 bg-brand-surface p-2.5 text-sm text-brand-text placeholder:text-brand-muted transition focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/40 dark:border-dark-muted/40 dark:bg-dark-surface dark:text-dark-text dark:placeholder:text-dark-muted dark:focus:border-brand-primary dark:focus:ring-brand-primary/40"
            />
            {fieldErrors.firstName ? (
              <div className="mt-2">
                <ErrorMessage>{fieldErrors.firstName}</ErrorMessage>
              </div>
            ) : null}
          </div>
          <div className="mb-5">
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-brand-text dark:text-dark-text"
            >
              Last name*
            </label>
            <input
              id="lastName"
              value={lastName}
              onChange={(event) => {
                clearFieldError('lastName');
                setLastName(event.currentTarget.value);
              }}
              className="mt-2 block w-full rounded-lg border border-brand-muted/30 bg-brand-surface p-2.5 text-sm text-brand-text placeholder:text-brand-muted transition focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/40 dark:border-dark-muted/40 dark:bg-dark-surface dark:text-dark-text dark:placeholder:text-dark-muted dark:focus:border-brand-primary dark:focus:ring-brand-primary/40"
            />
            {fieldErrors.lastName ? (
              <div className="mt-2">
                <ErrorMessage>{fieldErrors.lastName}</ErrorMessage>
              </div>
            ) : null}
          </div>
          <div className="mb-5">
            <label
              htmlFor="emailAddress"
              className="block text-sm font-medium text-brand-text dark:text-dark-text"
            >
              Email address*
            </label>
            <input
              id="emailAddress"
              value={emailAddress}
              type="email"
              onChange={(event) => {
                clearFieldError('emailAddress');
                setEmailAddress(event.currentTarget.value);
              }}
              className="mt-2 block w-full rounded-lg border border-brand-muted/30 bg-brand-surface p-2.5 text-sm text-brand-text placeholder:text-brand-muted transition focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/40 dark:border-dark-muted/40 dark:bg-dark-surface dark:text-dark-text dark:placeholder:text-dark-muted dark:focus:border-brand-primary dark:focus:ring-brand-primary/40"
            />
            {fieldErrors.emailAddress ? (
              <div className="mt-2">
                <ErrorMessage>{fieldErrors.emailAddress}</ErrorMessage>
              </div>
            ) : null}
          </div>
          <div className="mb-5">
            <label
              htmlFor="birthday"
              className="block text-sm font-medium text-brand-text dark:text-dark-text"
            >
              Birth date*
            </label>
            <input
              id="birthday"
              value={birthday}
              type="date"
              onChange={(event) => {
                clearFieldError('birthday');
                setBirthday(event.currentTarget.value);
              }}
              className="mt-2 block w-full rounded-lg border border-brand-muted/30 bg-brand-surface p-2.5 text-sm text-brand-text placeholder:text-brand-muted transition focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/40 dark:border-dark-muted/40 dark:bg-dark-surface dark:text-dark-text dark:placeholder:text-dark-muted dark:focus:border-brand-primary dark:focus:ring-brand-primary/40"
            />
            {fieldErrors.birthday ? (
              <div className="mt-2">
                <ErrorMessage>{fieldErrors.birthday}</ErrorMessage>
              </div>
            ) : null}
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
                checked={privacyAgreementAccepted}
                onChange={(event) => {
                  clearFieldError('privacyAgreement');
                  setPrivacyAgreementAccepted(event.currentTarget.checked);
                }}
                className="h-4 w-4 rounded border-brand-muted/40 text-brand-primary focus:ring-2 focus:ring-brand-primary/50 dark:border-dark-muted/40 dark:bg-dark-surface"
              />
              <label
                htmlFor="privacyAgreement"
                className="ms-2 text-sm font-medium text-brand-text dark:text-dark-text"
              >
                I agree to the Privacy Policy*
              </label>
            </div>
            {fieldErrors.privacyAgreement ? (
              <div className="mt-2">
                <ErrorMessage>{fieldErrors.privacyAgreement}</ErrorMessage>
              </div>
            ) : null}
          </div>
          <div className="mb-5">
            <button className="mb-2 me-2 w-full rounded-lg border border-brand-warning bg-brand-warning px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#d97706] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary/70">
              Register
            </button>
          </div>
          {formErrors.length > 0 ? (
            <div className="mb-5 space-y-2">
              {formErrors.map((error) => (
                <ErrorMessage key={`error-${error}`}>{error}</ErrorMessage>
              ))}
            </div>
          ) : null}
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
