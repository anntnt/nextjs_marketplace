'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useMemo, useRef, useState, type RefObject, type ReactNode } from 'react';
import { getSafeReturnToPath } from '../../../util/validation';
import ErrorMessage from '../../ErrorMessage';
import type { RegisterResponseBody } from '../api/register/route';

export type RegisterFormVariant = 'general' | 'seller' | 'buyer';

type Props = {
  returnTo?: string | string[];
  variant?: RegisterFormVariant;
  intro?: ReactNode;
  footerHint?: ReactNode;
  isBlocked?: boolean;
};

type FieldName =
  | 'username'
  | 'password'
  | 'passwordRepeat'
  | 'firstName'
  | 'lastName'
  | 'emailAddress'
  | 'birthday'
  | 'storeName'
  | 'privacyAgreement';

type InputFieldConfig = {
  id: FieldName;
  label: string;
  type: string;
  value: string;
  setter: (value: string) => void;
  ref: RefObject<HTMLInputElement>;
  autoComplete?: string;
};

const FIELD_LABELS: Record<FieldName, string> = {
  username: 'Username',
  password: 'Password',
  passwordRepeat: 'Confirm password',
  firstName: 'First name',
  lastName: 'Last name',
  emailAddress: 'Email address',
  birthday: 'Birth date',
  storeName: 'Store name',
  privacyAgreement: 'Privacy Policy agreement',
};

const FIELD_REQUIRED_MESSAGES: Record<FieldName, string> = {
  username: 'Please enter your username.',
  password: 'Please enter your password.',
  passwordRepeat: 'Please confirm your password.',
  firstName: 'Please enter your first name.',
  lastName: 'Please enter your last name.',
  emailAddress: 'Please enter your email address.',
  birthday: 'Please enter your birth date.',
  storeName: 'Please enter your store name.',
  privacyAgreement: 'Please agree to the Privacy Policy.',
};

const USERNAME_PATTERN = /^(?=.*[a-zA-Z])[a-zA-Z0-9_]{3,20}$/;
const USERNAME_PATTERN_MESSAGE =
  'Username: Your username must have at least one letter and no unusual characters.';
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MINIMUM_AGE = 18;
const MIN_BIRTH_YEAR = 1900;
export default function RegisterForm(props: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const variant = props.variant ?? 'general';
  const lockedRoleId = variant === 'seller' ? 2 : variant === 'buyer' ? 3 : undefined;
  const showRoleSelection = variant === 'general';
  const disableRoleToggle = !showRoleSelection;
  const isBlocked = props.isBlocked ?? false;
  const safeReturnTo = getSafeReturnToPath(props.returnTo);
  const alternateTargetBase = variant === 'seller' ? '/register/buyer' : '/register/seller';
  const alternateTarget =
    variant === 'general'
      ? null
      : safeReturnTo
        ? `${alternateTargetBase}?returnTo=${encodeURIComponent(safeReturnTo)}`
        : alternateTargetBase;

  // Form state
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [birthday, setBirthday] = useState('');
  const [gender, setGender] = useState('');
  const [privacyAgreementAccepted, setPrivacyAgreementAccepted] = useState(false);
  const [roleId, setRoleId] = useState<number>(() => lockedRoleId ?? 3);
  const [storeName, setStoreName] = useState('');
  const [uAddress, setUAddress] = useState('');
  const [errors, setErrors] = useState<{ message: string }[]>([]);
  const [shouldAutoFocusError, setShouldAutoFocusError] = useState(false);

  const disableInputs = isBlocked;
  const subtitle =
    variant === 'seller'
      ? 'Set up your account and open your eStores shop today.'
      : variant === 'buyer'
        ? 'Start your buyer journey'
        : 'Start your eStores journey';
  const defaultIntro =
    variant === 'general'
      ? (
          <>
            Buy what you love or start selling your own products
          </>
        )
      : variant === 'seller'
        ? ''
        : 'Now shop on eStores and discover amazing products.';
  const introContent = props.intro ?? defaultIntro;
  const defaultFooterHint =
    variant === 'seller'
      ? (
          <p className="mt-8 text-center text-sm text-brand-muted dark:text-dark-muted">
            Want to buy instead?{' '}
            {alternateTarget ? (
              <Link className="font-semibold text-brand-primary hover:text-brand-secondary" href={alternateTarget as any}>
                Create a buyer account
              </Link>
            ) : (
              'Create a buyer account'
            )}
          </p>
        )
      : variant === 'buyer'
        ? (
            <p className="mt-8 text-center text-sm text-brand-muted dark:text-dark-muted">
              Want to sell instead?{' '}
              {alternateTarget ? (
                <Link className="font-semibold text-brand-primary hover:text-brand-secondary" href={alternateTarget  as any}>
                  Open your shop
                </Link>
              ) : (
                'Open your shop'
              )}
            </p>
          )
        : null;
  const footerContent = props.footerHint ?? defaultFooterHint;
  // Refs for accessibility
  const usernameRef = useRef<HTMLInputElement>(null) as RefObject<HTMLInputElement>;
  const passwordRef = useRef<HTMLInputElement>(null) as RefObject<HTMLInputElement>;
  const passwordRepeatRef = useRef<HTMLInputElement>(null) as RefObject<HTMLInputElement>;
  const firstNameRef = useRef<HTMLInputElement>(null) as RefObject<HTMLInputElement>;
  const lastNameRef = useRef<HTMLInputElement>(null) as RefObject<HTMLInputElement>;
  const emailRef = useRef<HTMLInputElement>(null) as RefObject<HTMLInputElement>;
  const birthdayRef = useRef<HTMLInputElement>(null) as RefObject<HTMLInputElement>;
  const storeNameRef = useRef<HTMLInputElement>(null) as RefObject<HTMLInputElement>;
  const privacyRef = useRef<HTMLInputElement>(null) as RefObject<HTMLInputElement>;

  // Error mapping
  const { fieldErrors, formErrors } = useMemo(() => {
    const fieldErrorMap: Partial<Record<FieldName, string>> = {};
    const otherErrors: string[] = [];

    for (const { message } of errors) {
      const match = (Object.entries(FIELD_LABELS) as [FieldName, string][])
        .find(([, label]) => message.toLowerCase().startsWith(label.toLowerCase()));

      if (match) {
        const [field, label] = match;
        const remainder = message.slice(label.length).trim().replace(/^:\s*/, '');
        fieldErrorMap[field] = remainder || message;
      } else {
        otherErrors.push(message);
      }
    }

    return { fieldErrors: fieldErrorMap, formErrors: otherErrors };
  }, [errors]);

  // Focus on first invalid field
  useEffect(() => {
    if (!shouldAutoFocusError || errors.length === 0) return;

    const fieldOrder: FieldName[] = [
      'username',
      'password',
      'passwordRepeat',
      'firstName',
      'lastName',
      'emailAddress',
      'birthday',
      'storeName',
      'privacyAgreement',
    ];

    const refs: Record<FieldName, RefObject<HTMLInputElement>> = {
      username: usernameRef as RefObject<HTMLInputElement>,
      password: passwordRef as RefObject<HTMLInputElement>,
      passwordRepeat: passwordRepeatRef as RefObject<HTMLInputElement>,
      firstName: firstNameRef,
      lastName: lastNameRef,
      emailAddress: emailRef,
      birthday: birthdayRef,
      storeName: storeNameRef,
      privacyAgreement: privacyRef,
    };

    for (const field of fieldOrder) {
      if (fieldErrors[field]) {
        const ref = refs[field].current;
        if (ref) {
          ref.focus();
          ref.scrollIntoView?.({ block: 'center', behavior: 'smooth' });
        }
        break;
      }
    }
    setShouldAutoFocusError(false);
  }, [errors, fieldErrors, shouldAutoFocusError]);

  useEffect(() => {
    if (lockedRoleId && roleId !== lockedRoleId) {
      setRoleId(lockedRoleId);
    }
  }, [lockedRoleId, roleId]);

  const getInputClasses = (hasError: boolean) =>
    `mt-2 block w-full rounded-lg border p-2.5 text-sm transition
     ${hasError ? 'border-red-500 ring-2 ring-red-300' : 'border-brand-muted/30 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/40'}
     bg-brand-surface text-brand-text placeholder:text-brand-muted
     dark:border-dark-muted/40 dark:bg-dark-surface dark:text-dark-text dark:placeholder:text-dark-muted`;

  const clearFieldError = (field: FieldName) => {
    setErrors((prev) =>
      prev.filter(
        (error) => !error.message.toLowerCase().startsWith(FIELD_LABELS[field].toLowerCase()),
      ),
    );
  };

  async function handleRegister(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isBlocked) return;

    const trimmedEmail = emailAddress.trim();
    const trimmedUsername = username.trim();
    const trimmedStoreName = storeName.trim();
    const requiredFields: Array<{ key: FieldName; value: string }> = [
      { key: 'username', value: trimmedUsername },
      { key: 'password', value: password.trim() },
      { key: 'passwordRepeat', value: passwordRepeat.trim() },
      { key: 'firstName', value: firstName.trim() },
      { key: 'lastName', value: lastName.trim() },
      { key: 'emailAddress', value: trimmedEmail },
      { key: 'birthday', value: birthday.trim() },
      { key: 'privacyAgreement', value: privacyAgreementAccepted ? 'true' : '' },
    ];
    if (roleId === 2) {
      requiredFields.push({ key: 'storeName', value: trimmedStoreName });
    }

    const validationErrors: { message: string }[] = [];

    for (const field of requiredFields) {
      if (!field.value) {
        validationErrors.push({
          message: `${FIELD_LABELS[field.key]}: ${FIELD_REQUIRED_MESSAGES[field.key]}`,
        });
      }
    }

    if (trimmedUsername && !USERNAME_PATTERN.test(trimmedUsername)) {
      validationErrors.push({ message: USERNAME_PATTERN_MESSAGE });
    }

    if (trimmedEmail && !EMAIL_PATTERN.test(trimmedEmail)) {
      validationErrors.push({
        message: `${FIELD_LABELS.emailAddress}: Please enter a valid email address.`,
      });
    }

    if (password && passwordRepeat && password !== passwordRepeat) {
      validationErrors.push({
        message: 'Confirm password: The passwords do not match.',
      });
    }

    if (birthday) {
      const parsedBirthDate = new Date(birthday);
      if (Number.isNaN(parsedBirthDate.getTime())) {
        validationErrors.push({ message: 'Birth date: Please enter a valid date.' });
      } else {
        if (parsedBirthDate.getFullYear() < MIN_BIRTH_YEAR) {
          validationErrors.push({ message: 'Birth date: Please enter a valid date.' });
        } else {
          const today = new Date();
          const minimumBirthDate = new Date(
            today.getFullYear() - MINIMUM_AGE,
            today.getMonth(),
            today.getDate(),
          );
          if (parsedBirthDate > minimumBirthDate) {
            validationErrors.push({ message: 'Birth date: You must be at least 18 years old.' });
          }
        }
      }
    }

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      setShouldAutoFocusError(true);
      return;
    }

    setErrors([]);
    setShouldAutoFocusError(false);

    const response = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: trimmedUsername,
        password,
        passwordRepeat,
        firstName,
        lastName,
        emailAddress: trimmedEmail,
        birthday,
        gender,
        storeName: trimmedStoreName,
        uAddress,
        roleId,
      }),
    });

    let data: RegisterResponseBody | undefined;
    try {
      data = (await response.json()) as RegisterResponseBody;
    } catch {
      data = undefined;
    }

    if (!data || !data.success) {
      setErrors(data?.errors ?? [{ message: 'Please check the form and try again.' }]);
      setShouldAutoFocusError(true);
      return;
    }

    const registerPaths = ['/register', '/register/seller', '/register/buyer'] as const;

    const userRoleId = data.user.roleId;
    if (userRoleId === 2) {
      router.push(`/profile/${data.user.username}`);
      router.refresh();
      return;
    }

    const fallbackPath = pathname && !registerPaths.includes(pathname as typeof registerPaths[number]) ? pathname : '/';
    const target =
      safeReturnTo && !registerPaths.includes(safeReturnTo as typeof registerPaths[number]) ? safeReturnTo : fallbackPath;

    router.push(target as any);
    router.refresh();
  }

  const handleRoleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nextValue = Number(event.target.value);
    if (disableRoleToggle || (lockedRoleId && nextValue !== lockedRoleId)) {
      event.preventDefault();
      return;
    }
    setRoleId(nextValue);
  };

  const baseFieldConfigs: InputFieldConfig[] = [
    {
      id: 'username',
      label: 'Username*',
      type: 'text',
      value: username,
      setter: setUsername,
      ref: usernameRef,
      autoComplete: 'username',
    },
    {
      id: 'password',
      label: 'Password*',
      type: 'password',
      value: password,
      setter: setPassword,
      ref: passwordRef,
      autoComplete: 'new-password',
    },
    {
      id: 'passwordRepeat',
      label: 'Confirm password*',
      type: 'password',
      value: passwordRepeat,
      setter: setPasswordRepeat,
      ref: passwordRepeatRef,
      autoComplete: 'new-password',
    },
    {
      id: 'firstName',
      label: 'First name*',
      type: 'text',
      value: firstName,
      setter: setFirstName,
      ref: firstNameRef,
      autoComplete: 'given-name',
    },
    {
      id: 'lastName',
      label: 'Last name*',
      type: 'text',
      value: lastName,
      setter: setLastName,
      ref: lastNameRef,
      autoComplete: 'family-name',
    },
    {
      id: 'emailAddress',
      label: 'Email address*',
      type: 'email',
      value: emailAddress,
      setter: setEmailAddress,
      ref: emailRef,
      autoComplete: 'email',
    },
    {
      id: 'birthday',
      label: 'Birth date*',
      type: 'date',
      value: birthday,
      setter: setBirthday,
      ref: birthdayRef,
      autoComplete: 'bday',
    },
  ];

  const inputFieldConfigs: InputFieldConfig[] = baseFieldConfigs;

  return (
    <>
      <div
        className="mx-auto max-w-lg rounded-2xl bg-white px-6 py-10 text-brand-text shadow-md dark:bg-gray-900 dark:text-dark-text"
        aria-hidden={isBlocked}
      >
        <h2 className="mb-4 text-center text-md">{subtitle}</h2>
        <p className="text-sm text-center text-brand-muted dark:text-dark-muted">{introContent}</p>

        <form
          noValidate
          onSubmit={handleRegister}
          aria-describedby={formErrors.length ? 'form-errors' : undefined}
          className="mt-8"
          aria-disabled={isBlocked}
        >
          {formErrors.length > 0 && (
            <div
              id="form-errors"
              role="alert"
              className="mb-5 rounded-md border border-red-500 bg-red-50 p-3 text-red-700"
            >
              <ul className="list-disc pl-5">
                {formErrors.map((error) => (
                  <li key={error}>{error}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Role selection */}
          {showRoleSelection ? (
            <fieldset className="mb-5">
              <legend className="block text-sm font-medium">Choose your role*</legend>
              <div className="mt-2 flex items-center gap-4">
                <input
                  type="radio"
                  id="buyer"
                  name="roleId"
                  value="3"
                  checked={roleId === 3}
                  onChange={handleRoleChange}
                  required
                  aria-required="true"
                  disabled={disableInputs}
                />
                <label htmlFor="buyer">Buyer</label>
                <input
                  type="radio"
                  id="seller"
                  name="roleId"
                  value="2"
                  checked={roleId === 2}
                  onChange={handleRoleChange}
                  required
                  aria-required="true"
                  disabled={disableInputs}
                />
                <label htmlFor="seller">Seller</label>
              </div>
            </fieldset>
          ) : null}

          {/* Input fields */}
          {inputFieldConfigs.map(({ id, label, type, value, setter, ref, autoComplete }) => (
            <div key={id} className="mb-5">
              <label htmlFor={id} className="block text-sm font-medium">
                {label}
              </label>
              <input
                id={id}
                ref={ref}
                type={type}
                className={getInputClasses(Boolean(fieldErrors[id as FieldName]))}
                aria-invalid={Boolean(fieldErrors[id as FieldName])}
                aria-describedby={
                  [fieldErrors[id as FieldName] ? `${id}-error` : null]
                    .filter(Boolean)
                    .join(' ') || undefined
                }
                required
                aria-required="true"
                value={value}
                disabled={disableInputs}
                autoComplete={autoComplete}
                onChange={(e) => {
                  clearFieldError(id as FieldName);
                  setter(e.currentTarget.value);
                }}
              />
              {fieldErrors[id as FieldName] && (
                <div
                  id={`${id}-error`}
                  className="mt-1"
                  role="alert"
                  aria-live="polite"
                >
                  <ErrorMessage>{fieldErrors[id as FieldName]}</ErrorMessage>
                </div>
              )}
            </div>
          ))}

          {/* Gender */}
          <div className="mb-5">
            <label htmlFor="gender" className="block mb-2 text-sm font-medium">
              Gender
            </label>
            <select
              id="gender"
              value={gender}
              onChange={(event) => setGender(event.currentTarget.value)}
              className={getInputClasses(false)}
              disabled={disableInputs}
            >
              <option value="">Please select...</option>
              <option value="female">Female</option>
              <option value="male">Male</option>
              <option value="other">Other</option>
            </select>
          </div>

          {roleId === 2 ? (
            <div className="mb-5">
              <label htmlFor="storeName" className="block mb-2 text-sm font-medium">
                Store name*
              </label>
              <input
                id="storeName"
                ref={storeNameRef}
                value={storeName}
                onChange={(event) => {
                  clearFieldError('storeName');
                  setStoreName(event.currentTarget.value);
                }}
                className={getInputClasses(Boolean(fieldErrors.storeName))}
                disabled={disableInputs}
                required
                aria-required="true"
                aria-invalid={Boolean(fieldErrors.storeName)}
                aria-describedby={fieldErrors.storeName ? 'storeName-error' : undefined}
                autoComplete="organization"
              />
              {fieldErrors.storeName ? (
                <div
                  id="storeName-error"
                  className="mt-1"
                  role="alert"
                  aria-live="polite"
                >
                  <ErrorMessage>{fieldErrors.storeName}</ErrorMessage>
                </div>
              ) : null}
            </div>
          ) : null}

          {/* Address */}
          <div className="mb-5">
            <label htmlFor="uAddress" className="block mb-2 text-sm font-medium">
              Address
            </label>
            <input
              id="uAddress"
              value={uAddress}
              onChange={(event) => setUAddress(event.currentTarget.value)}
              className={getInputClasses(false)}
              disabled={disableInputs}
              autoComplete="street-address"
            />
          </div>

          {/* Privacy */}
          <div className="mb-5">
            <div className={`flex items-center ${fieldErrors.privacyAgreement ? 'rounded border border-red-500 p-2' : ''}`}>
              <input
                id="privacyAgreement"
                type="checkbox"
                ref={privacyRef}
                checked={privacyAgreementAccepted}
                onChange={(event) => {
                  clearFieldError('privacyAgreement');
                  setPrivacyAgreementAccepted(event.currentTarget.checked);
                }}
                aria-invalid={Boolean(fieldErrors.privacyAgreement)}
                aria-describedby={fieldErrors.privacyAgreement ? 'privacy-error' : undefined}
                required
                aria-required="true"
                className={`h-4 w-4 rounded text-brand-primary focus:ring-2 focus:ring-brand-primary/50 dark:bg-dark-surface ${fieldErrors.privacyAgreement ? 'border-red-500 focus:ring-red-300' : 'border-brand-muted/40 dark:border-dark-muted/40'}`}
                disabled={disableInputs}
              />
              <label htmlFor="privacyAgreement" className="ml-2 text-sm font-medium">
                I agree to the Privacy Policy *
              </label>
            </div>

            {fieldErrors.privacyAgreement && (
              <div id="privacy-error" className="mt-2" role="alert">
                <ErrorMessage>{fieldErrors.privacyAgreement}</ErrorMessage>
              </div>
            )}
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="mb-2 w-full rounded-lg border border-brand-warning bg-brand-warning px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#d97706] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary/70"
            disabled={disableInputs}
            aria-disabled={disableInputs}
          >
            Register
          </button>

          {footerContent}
        </form>
      </div>

      {/* Login section */}
      <div className="mx-auto mt-8 max-w-md text-center text-lg text-brand-text dark:text-dark-text">
        <hr className="mb-4" />
        <p className="text-brand-muted dark:text-dark-muted">Already have an account?</p>
        <Link
          href="/login"
          className="font-semibold text-brand-primary underline underline-offset-2 transition-colors hover:text-brand-secondary focus:text-brand-secondary"
        >
          Log in
        </Link>{' '}
        to shop or sell now!
      </div>
    </>
  );
}
