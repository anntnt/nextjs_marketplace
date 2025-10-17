'use client';

import { useEffect, useMemo, useRef } from 'react';
import { clearFlashMessage } from '../app/actions/flashMessage';
import type { FlashMessageType } from '../lib/flashMessage';

type FlashMessageBannerProps = {
  message?: string;
  type?: FlashMessageType;
};

export default function FlashMessageBanner({ message, type = 'info' }: FlashMessageBannerProps) {
  const hasClearedRef = useRef(false);

  useEffect(() => {
    if (!message || hasClearedRef.current) return;
    hasClearedRef.current = true;
    void clearFlashMessage();
  }, [message]);

  const styles = useMemo(() => {
    switch (type) {
      case 'success':
        return 'bg-brand-success/40 text-brand-secondary dark:bg-brand-success/20 dark:text-brand-success';
      case 'error':
        return 'bg-brand-error/10 text-brand-error dark:bg-brand-error/20';
      case 'warning':
        return 'bg-brand-warning/20 text-brand-warning dark:bg-brand-warning/30 dark:text-brand-warning';
      default:
        return 'bg-brand-primary/10 text-brand-primary dark:bg-brand-primary/20';
    }
  }, [type]);

  if (!message) return null;

  return (
    <div className={`py-2 text-center text-sm ${styles}`} role="status" aria-live="polite">
      {message}
    </div>
  );
}
