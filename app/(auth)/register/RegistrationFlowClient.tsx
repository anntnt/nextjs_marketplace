'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import FocusTrap from 'focus-trap-react';
import { useRouter } from 'next/navigation';
import RegisterForm, { type RegisterFormVariant } from './RegisterForm';
import { logout } from '../logout/actions';
import { getSafeReturnToPath } from '../../../util/validation';

const SELLER_ROLE_ID = 2;
const BUYER_ROLE_ID = 3;

type Props = {
  variant: Exclude<RegisterFormVariant, 'general'>;
  returnTo?: string | string[];
  currentUserRoleId?: number | null;
};

export default function RegistrationFlowClient({ variant, returnTo, currentUserRoleId }: Props) {
  const router = useRouter();
  const safeReturnTo = getSafeReturnToPath(returnTo);
  const shouldShowConflictModal =
    (variant === 'seller' && currentUserRoleId === BUYER_ROLE_ID) ||
    (variant === 'buyer' && currentUserRoleId === SELLER_ROLE_ID);
  const [showModal, setShowModal] = useState(shouldShowConflictModal);
  const [isProcessing, setIsProcessing] = useState(false);
  const confirmButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setShowModal(shouldShowConflictModal);
  }, [shouldShowConflictModal]);

  useEffect(() => {
    if (!showModal) return;
    const handle = window.setTimeout(() => {
      confirmButtonRef.current?.focus();
    }, 0);
    return () => window.clearTimeout(handle);
  }, [showModal]);

  const { modalTitle, modalBody, confirmLabel, cancelLabel } = useMemo(() => {
    if (variant === 'seller') {
      return {
        modalTitle: 'Switch to a seller account',
        modalBody:
          'You are logged in as a buyer. To open a shop, you need to register a separate seller account.',
        confirmLabel: 'Log out and continue',
        cancelLabel: 'Stay logged in',
      };
    }

    return {
      modalTitle: 'Switch to a buyer account',
      modalBody:
        'You are logged in as a seller. To buy on eStores, please create a buyer account.',
      confirmLabel: 'Log out and continue',
      cancelLabel: 'Stay logged in',
    };
  }, [variant]);

  const basePath = variant === 'seller' ? '/register/seller' : '/register/buyer';
  const targetWithReturnTo = safeReturnTo
    ? `${basePath}?returnTo=${encodeURIComponent(safeReturnTo)}`
    : basePath;

  const handleConfirm = async () => {
    try {
      setIsProcessing(true);
      await logout();
      router.replace(targetWithReturnTo);
      router.refresh();
    } catch (error) {
      console.error('Failed to switch account role', error);
      setIsProcessing(false);
    }
  };

  const handleCancel = () => {
    const fallbackTarget = safeReturnTo ?? '/';
    router.push(fallbackTarget);
  };

  const disableForm = showModal || isProcessing;

  return (
    <>
      {showModal ? (
        <FocusTrap focusTrapOptions={{ clickOutsideDeactivates: false, escapeDeactivates: false }}>
          <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/60 px-4">
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="role-switch-title"
              aria-describedby="role-switch-description"
              className="w-full max-w-md rounded-2xl bg-white px-6 py-6 text-brand-text shadow-xl dark:bg-gray-900 dark:text-dark-text"
            >
              <h2 id="role-switch-title" className="text-xl font-semibold text-brand-text dark:text-dark-text">
                {modalTitle}
              </h2>
              <p
                id="role-switch-description"
                className="mt-3 text-sm text-brand-muted dark:text-dark-muted"
              >
                {modalBody}
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  ref={confirmButtonRef}
                  onClick={handleConfirm}
                  disabled={isProcessing}
                  className="inline-flex items-center justify-center rounded-lg border border-brand-secondary bg-brand-secondary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#024c61] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary/60 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {confirmLabel}
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  disabled={isProcessing}
                  className="inline-flex items-center justify-center rounded-lg border border-brand-muted/40 bg-white px-4 py-2 text-sm font-semibold text-brand-text transition-colors hover:bg-brand-muted/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary/60 dark:border-dark-muted/30 dark:bg-dark-surface dark:text-dark-text dark:hover:bg-dark-muted/20 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {cancelLabel}
                </button>
              </div>
            </div>
          </div>
        </FocusTrap>
      ) : null}

      <RegisterForm isBlocked={disableForm} variant={variant} returnTo={returnTo} />
    </>
  );
}
