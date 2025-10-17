'use client';

import { useEffect, useRef } from 'react';
import { clearFlashMessage } from '../app/actions/flashMessage';

type FlashMessageBannerProps = {
  message?: string;
};

export default function FlashMessageBanner({ message }: FlashMessageBannerProps) {
  const hasClearedRef = useRef(false);

  useEffect(() => {
    if (!message || hasClearedRef.current) return;
    hasClearedRef.current = true;
    void clearFlashMessage();
  }, [message]);

  if (!message) return null;

  return (
    <div
      className="bg-brand-primary/10 py-2 text-center text-sm text-brand-primary dark:bg-brand-primary/20"
      role="status"
      aria-live="polite"
    >
      {message}
    </div>
  );
}
