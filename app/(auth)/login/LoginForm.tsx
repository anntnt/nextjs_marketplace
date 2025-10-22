'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useMemo, useRef, useState, type RefObject } from 'react';
import { getSafeReturnToPath } from '../../../util/validation';
import ErrorMessage from '../../ErrorMessage';
import type { LoginResponseBody } from '../api/login/route';

type Props = { returnTo?: string | string[] };

export default function LoginForm(props: Props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<
    { message: string; type?: 'auth' | 'field' | 'form' }[]
  >([]);
  const [shouldAutoFocusError, setShouldAutoFocusError] = useState(false);

  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  type FieldName = 'username' | 'password';

  const FIELD_LABELS: Record<FieldName, string> = {
    username: 'Username',
    password: 'Password',
  };

  const FIELD_REQUIRED_MESSAGES: Record<FieldName, string> = {
    username: 'Please enter your username.',
    password: 'Please enter your password.',
  };
  const getInputClasses = (hasError: boolean) =>
    `block w-full rounded-lg border bg-brand-surface p-2.5 text-sm text-brand-text placeholder:text-brand-muted transition focus:outline-none
     ${
       hasError
         ? 'border-red-500 ring-2 ring-red-300 focus:border-red-500 focus:ring-red-300'
         : 'border-brand-muted/30 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/40'
     }
     dark:border-dark-muted/40 dark:bg-dark-surface dark:text-dark-text dark:placeholder:text-dark-muted dark:focus:border-brand-primary dark:focus:ring-brand-primary/40`;

  const { fieldErrors, formErrors, authError, authErrorFields } = useMemo(() => {
    const fieldErrorMap: Partial<Record<FieldName, string>> = {};
    const otherErrors: string[] = [];
    let authMessage = '';
    const authFields = new Set<FieldName>();

    for (const error of errors) {
      const { message } = error;
      const normalizedMessage = message.toLowerCase();

      if (normalizedMessage.includes('username or password is invalid')) {
        authMessage = 'The username or password you entered is incorrect.';
        authFields.add('username');
        authFields.add('password');
        continue;
      }

      const match = (Object.entries(FIELD_LABELS) as [FieldName, string][])
        .find(([, label]) => normalizedMessage.startsWith(label.toLowerCase()));

      if (match) {
        const [field, label] = match;
        const remainder = message.slice(label.length).trim().replace(/^:\s*/, '');
        fieldErrorMap[field] = remainder || message;
      } else {
        otherErrors.push(message);
      }
    }

    return {
      fieldErrors: fieldErrorMap,
      formErrors: otherErrors,
      authError: authMessage,
      authErrorFields: Array.from(authFields),
    };
  }, [errors]);

  useEffect(() => {
    if (!shouldAutoFocusError || errors.length === 0) return;

    const fieldOrder: FieldName[] = ['username', 'password'];
    const refs: Record<FieldName, RefObject<HTMLInputElement>> = {
      username: usernameRef as RefObject<HTMLInputElement>,
      password: passwordRef as RefObject<HTMLInputElement>,
    };

    for (const field of fieldOrder) {
      const hasError = Boolean(fieldErrors[field]) || authErrorFields.includes(field);
      if (hasError) {
        const ref = refs[field].current;
        if (ref) {
          ref.focus();
          ref.scrollIntoView?.({ block: 'center', behavior: 'smooth' });
        }
        break;
      }
    }

    setShouldAutoFocusError(false);
  }, [errors, fieldErrors, authErrorFields, shouldAutoFocusError]);

  const clearFieldError = (field: FieldName) => {
    setErrors((prev) =>
      prev.filter((error) => {
        if (error.type === 'auth') {
          return false;
        }
        const lowerMessage = error.message.toLowerCase();
        return !lowerMessage.startsWith(FIELD_LABELS[field].toLowerCase());
      }),
    );
  };

  const router = useRouter();
  const pathname = usePathname();

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedUsername = username.trim();
    const trimmedPassword = password;

    const validationErrors: { message: string; type: 'field' }[] = [];

    if (!trimmedUsername) {
      validationErrors.push({
        message: `${FIELD_LABELS.username}: ${FIELD_REQUIRED_MESSAGES.username}`,
        type: 'field',
      });
    }

    if (!trimmedPassword) {
      validationErrors.push({
        message: `${FIELD_LABELS.password}: ${FIELD_REQUIRED_MESSAGES.password}`,
        type: 'field',
      });
    }

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      setShouldAutoFocusError(true);
      return;
    }

    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        username: trimmedUsername,
        password: trimmedPassword,
      }),
    });

    let data: LoginResponseBody | undefined;
    try {
      data = (await response.json()) as LoginResponseBody;
    } catch {
      data = undefined;
    }

    if (!response.ok || !data) {
      setErrors([{ message: 'Unable to login. Please try again.', type: 'form' }]);
      setShouldAutoFocusError(true);
      return;
    }

    if (!data.success) {
      setErrors(
        data.errors.map((error) => ({
          message: error.message,
          type: error.message.toLowerCase().includes('username or password')
            ? 'auth'
            : 'form',
        })),
      );
      setShouldAutoFocusError(true);
      return;
    }

    setErrors([]);
    setShouldAutoFocusError(false);

    const { user } = data;

    const safeReturnTo = getSafeReturnToPath(props.returnTo);
    const fallbackPath = pathname && pathname !== '/login' ? pathname : '/';
    const target = safeReturnTo && safeReturnTo !== '/login' ? safeReturnTo : fallbackPath;

    if (user.roleId === 2 || user.roleId === 3) {
      router.push(target as any);
    } else {
      router.push(`/profile/${user.username}`);
    }

    router.refresh();
  }

  return (
    <>
      <div className="mx-auto max-w-md text-brand-text dark:text-dark-text">
        <form
          noValidate
          className="py-8"
          aria-describedby={[
            authError ? 'auth-error' : null,
            formErrors.length ? 'login-form-errors' : null,
          ]
            .filter(Boolean)
            .join(' ') || undefined}
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
              ref={usernameRef}
              className={getInputClasses(Boolean(fieldErrors.username))}
              value={username}
              required
              aria-required="true"
              aria-invalid={
                Boolean(fieldErrors.username) || authErrorFields.includes('username')
              }
              aria-describedby={[
                fieldErrors.username ? 'username-error' : null,
                authError && authErrorFields.includes('username') ? 'auth-error' : null,
              ]
                .filter(Boolean)
                .join(' ') || undefined}
              onChange={(event) => {
                clearFieldError('username');
                setUsername(event.currentTarget.value);
              }}
            />
            {fieldErrors.username && (
              <div id="username-error" className="mt-2" role="alert" aria-live="polite">
                <ErrorMessage>{fieldErrors.username}</ErrorMessage>
              </div>
            )}
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
              ref={passwordRef}
              className={getInputClasses(Boolean(fieldErrors.password))}
              value={password}
              required
              aria-required="true"
              aria-invalid={
                Boolean(fieldErrors.password) || authErrorFields.includes('password')
              }
              aria-describedby={[
                fieldErrors.password ? 'password-error' : null,
                authError && authErrorFields.includes('password') ? 'auth-error' : null,
              ]
                .filter(Boolean)
                .join(' ') || undefined}
              onChange={(event) => {
                clearFieldError('password');
                setPassword(event.currentTarget.value);
              }}
            />
            {fieldErrors.password && (
              <div id="password-error" className="mt-2" role="alert" aria-live="polite">
                <ErrorMessage>{fieldErrors.password}</ErrorMessage>
              </div>
            )}
          </div>
          <div className="mb-5">
            <button className="mb-2 me-2 w-full rounded-lg border border-brand-warning bg-brand-warning px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#d97706] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary/70">
              Login
            </button>
          </div>
          {authError && (
            <div
              id="auth-error"
              role="alert"
              aria-live="assertive"
              className="mb-4 rounded-md border border-red-500 bg-red-50 p-3 text-red-700"
            >
              {authError}
            </div>
          )}

          {formErrors.length > 0 && (
            <div
              id="login-form-errors"
              role="alert"
              aria-live="assertive"
              className="mb-5 rounded-md border border-red-500 bg-red-50 p-3 text-red-700"
            >
              <p className="font-medium">Please correct the following issues:</p>
              <ul className="mt-2 list-disc pl-5 text-sm">
                {formErrors.map((error) => (
                  <li key={error}>{error}</li>
                ))}
              </ul>
            </div>
          )}
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
