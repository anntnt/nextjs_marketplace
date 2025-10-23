'use client';

import Link from 'next/link';
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
} from 'react';
import LogoutButton from '../app/(auth)/logout/LogoutButton';
import type { User } from '../migrations/0001-createTableUsers';
import { FiChevronDown } from 'react-icons/fi';

export type ProfileDropdownProps = {
  user?: User;
  onOpenChange?: (open: boolean) => void;
};

const focusableSelectors =
  'a[href],button:not([disabled]),[tabindex]:not([tabindex="-1"])';

export default function ProfileDropdown({ user, onOpenChange }: ProfileDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const closeDropdown = useCallback(
    (restoreFocus = true) => {
      setIsOpen(false);
      onOpenChange?.(false);
      if (restoreFocus) {
        requestAnimationFrame(() => buttonRef.current?.focus());
      }
    },
    [onOpenChange]
  );

  const openDropdown = useCallback(() => {
    setIsOpen(true);
    onOpenChange?.(true);
  }, [onOpenChange]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.stopPropagation();
        closeDropdown();
      }
    };

    const handleScroll = () => closeDropdown(false);

    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, closeDropdown]);

  const handleButtonClick = (event: ReactMouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (isOpen) {
      closeDropdown();
      return;
    }
    openDropdown();
  };

  const handleMenuSelection = () => {
    closeDropdown();
  };

  const handleMouseEnter = () => {
    openDropdown();
  };

  const handleMouseLeave = () => {
    closeDropdown(false);
  };

  const handleFocusLeave = (event: React.FocusEvent<HTMLDivElement>) => {
    if (!dropdownRef.current?.contains(event.relatedTarget as Node)) {
      closeDropdown(false);
    }
  };

  const handleMenuKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'Tab') return;
    const focusable = dropdownRef.current?.querySelectorAll<HTMLElement>(focusableSelectors);
    if (!focusable || focusable.length === 0) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const active = document.activeElement as HTMLElement | null;

    if (!event.shiftKey && active === last) {
      event.preventDefault();
      closeDropdown();
    } else if (event.shiftKey && active === first) {
      event.preventDefault();
      closeDropdown();
    }
  };

  return (
    <div
      className="relative hidden md:block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        ref={buttonRef}
        type="button"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-controls="profile-menu"
        className="group inline-flex items-center rounded-full border border-transparent bg-brand-secondary px-3 py-2 text-sm font-semibold text-white transition hover:text-brand-warning focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-warning focus-visible:ring-offset-2 focus-visible:ring-offset-brand-secondary dark:text-dark-text"
        onClick={handleButtonClick}
      >
        <svg
          className="h-6 w-6 text-white transition-colors group-hover:text-brand-warning group-focus:text-brand-warning group-active:text-brand-warning dark:text-brand-accent dark:group-hover:text-brand-warning dark:group-focus:text-brand-warning dark:group-active:text-brand-warning"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            fillRule="evenodd"
            d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4h-4Z"
            clipRule="evenodd"
          />
        </svg>
        <span className="hidden sm:inline">Hi, {user?.firstname}</span>
        <FiChevronDown aria-hidden="true" className="h-4 w-4 ml-1" strokeWidth={3.2} />
      </button>

      <div
        className={`fixed left-0 right-0 bottom-0 z-40 bg-gradient-to-b from-transparent via-black/60 to-black/70 transition-opacity duration-200 ease-in-out ${
          isOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
        style={{ top: 'var(--header-height, 60px)' }}
        aria-hidden="true"
        onClick={() => closeDropdown()}
        onMouseEnter={() => setTimeout(() => closeDropdown(false), 120)}
      />

      <div
        className={`absolute right-0 top-full z-[70] flex w-56 translate-x-10 flex-col transition-all duration-150 ease-out ${
          isOpen
            ? 'pointer-events-auto translate-y-0 opacity-100'
            : 'pointer-events-none -translate-y-2 opacity-0'
        }`}
      >
        <span className="block h-4" aria-hidden="true" />
        <div
          ref={dropdownRef}
          id="profile-menu"
          role="menu"
          aria-label="Profile options"
          className="rounded-lg border border-brand-muted/20 bg-brand-surface shadow-xl focus:outline-none dark:border-dark-muted/20 dark:bg-dark-surface"
          onBlur={handleFocusLeave}
          onKeyDown={handleMenuKeyDown}
        >
          <ul className="px-6 pb-6 pt-5 text-sm text-brand-muted dark:text-dark-muted">
            <li>
              {user && (
                <Link
                  data-first-focus
                  href={`/profile/${user.username}`}
                  role="menuitem"
                  className="mx-auto block w-36 rounded-lg border border-brand-primary bg-brand-primary px-4 py-2 text-center font-semibold text-white transition-colors hover:bg-brand-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary/70 active:bg-brand-secondary/90"
                  onClick={handleMenuSelection}
                >
                  Dashboard
                </Link>
              )}
            </li>
            <li className="mt-4 flex justify-center">
              <LogoutButton onLogout={handleMenuSelection} />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
