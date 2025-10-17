'use client';

import { useMemo } from 'react';
import type { FlashMessageType } from '../lib/flashMessage';

type FlashMessageBannerProps = {
  message?: string;
  type?: FlashMessageType;
};

export default function FlashMessageBanner({ message, type = 'info' }: FlashMessageBannerProps) {
  const styles = useMemo(() => {
    switch (type) {
      case 'success':
        return 'bg-success-light text-success dark:bg-brand-success/20 dark:text-brand-success';
      case 'error':
        return 'bg-error-light text-error dark:bg-brand-error/20';
      case 'warning':
        return 'bg-warning-light text-warning dark:bg-brand-warning/30 dark:text-brand-warning';
      default:
        return 'bg-info-light text-info dark:bg-brand-primary/20';
    }
  }, [type]);

  if (!message) return null;

  return (
    <div className={`py-2 text-center text-sm ${styles}`} role="status" aria-live="polite">
      {message}
    </div>
  );
}
