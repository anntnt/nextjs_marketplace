'use client';

import Link from 'next/link';
import { getSafeReturnToPath } from '../util/validation';
import { useMemo, useEffect, useRef, useState, useCallback } from 'react';
import type { MouseEvent as ReactMouseEvent, KeyboardEvent as ReactKeyboardEvent } from 'react';
import { usePathname } from 'next/navigation';
import { FiChevronDown } from 'react-icons/fi';

export type AccountDropdownProps = {
  onOpenChange?: (open: boolean) => void;
};

const focusableSelectors =
  'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])';
const REGISTER_PATHS = ['/register', '/register/seller', '/register/buyer'];

export default function AccountDropdown({ onOpenChange }: AccountDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pendingFocusDir = useRef<'next' | 'prev' | null>(null);
  const pathname = usePathname();
  const [headerBottom, setHeaderBottom] = useState(0);

  useEffect(() => {
    const header = document.querySelector('header');
    if (!header) return;

    const updateHeaderBottom = () => {
      const rect = header.getBoundingClientRect();
      setHeaderBottom(rect.bottom + window.scrollY);
    };

    updateHeaderBottom();
    window.addEventListener('scroll', updateHeaderBottom, { passive: true });
    window.addEventListener('resize', updateHeaderBottom);
    return () => {
      window.removeEventListener('scroll', updateHeaderBottom);
      window.removeEventListener('resize', updateHeaderBottom);
    };
  }, []);

  // Duplicate declaration removed

  // --- helpers ----------------------------------------------------
  const clearTimeouts = useCallback(
    (ids: (ReturnType<typeof setTimeout> | null)[]) => ids.forEach((id) => id && clearTimeout(id)),
    []
  );
  const openTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const overlayTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ✅ FIXED: safer version of safeContains
  const safeContains = (parent?: Element | null, child?: any): boolean => {
    if (!parent || !child) return false;
    try {
      // Ensure child is actually a Node (to avoid runtime crash)
      return child instanceof Node && parent.contains(child);
    } catch {
      return false;
    }
  };

  const currentPath =
    pathname && pathname !== '/login' && !REGISTER_PATHS.includes(pathname) ? pathname : '/';

  const loginHref = useMemo(() => {
    const sanitized = pathname && pathname !== '/login' ? pathname : undefined;
    const safe = getSafeReturnToPath(sanitized);
    return safe ? `/login?returnTo=${safe}` : '/login';
  }, [pathname]);

  const registerHref = useMemo(() => {
    if (!pathname || REGISTER_PATHS.includes(pathname)) return '/register';
    return `/register?returnTo=${currentPath}`;
  }, [currentPath, pathname]);

  // --- open/close -------------------------------------------------
  const openDropdown = useCallback(
    (byKeyboard: boolean) => {
      clearTimeouts([openTimer.current, overlayTimer.current]);
      setOpenedByKeyboard(byKeyboard);
      setIsOpen(true);
      setOverlayVisible(true);
      setOverlayReady(false);
      overlayTimer.current = setTimeout(() => setOverlayReady(true), 180);
      onOpenChange?.(true);
    },
    [onOpenChange, clearTimeouts]
  );

  const closeDropdown = useCallback(() => {
    clearTimeouts([openTimer.current, overlayTimer.current]);
    setIsOpen(false);
    setOpenedByKeyboard(false);
    setOverlayReady(false);
    setOverlayVisible(false);
    onOpenChange?.(false);
  }, [onOpenChange, clearTimeouts]);

  const handleButtonClick = (e: ReactMouseEvent<HTMLButtonElement>) => {
    const byKeyboard = e.detail === 0;
    isOpen ? closeDropdown() : openDropdown(byKeyboard);
  };
  const handleMenuKeyDown = useCallback(
    (event: ReactKeyboardEvent<HTMLDivElement>) => {
      if (event.key !== 'Tab') return;
      const dropdown = dropdownRef.current;
      if (!dropdown) return;

      const focusable = dropdown.querySelectorAll<HTMLElement>(focusableSelectors);
      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement as HTMLElement | null;

      if (event.shiftKey && active === first) {
        event.preventDefault();
        event.stopPropagation();
        (document.activeElement as HTMLElement | null)?.blur();

        pendingFocusDir.current = 'prev';
        closeDropdown();
        return;
      }

      if (!event.shiftKey && active === last) {
        event.preventDefault();
        event.stopPropagation();
        (document.activeElement as HTMLElement | null)?.blur();

        pendingFocusDir.current = 'next';
        closeDropdown();
      }
    },
    [closeDropdown]
  );

  useEffect(() => {
    if (!isOpen && pendingFocusDir.current) {
      const dir = pendingFocusDir.current;
      pendingFocusDir.current = null;
      requestAnimationFrame(() => {
        document.dispatchEvent(
          new CustomEvent('nav:neighbor-focus', {
            detail: { direction: dir, sender: buttonRef.current },
          })
        );
      });
    }
  }, [isOpen]);
  
// --- close dropdown on Escape or scroll ---------------------------
useEffect(() => {
  if (!isOpen) return;

  const onKey = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      closeDropdown();
      requestAnimationFrame(() => {
        requestAnimationFrame(() => buttonRef.current?.focus());
      });
    }
  };

  const onScroll = () => {
    closeDropdown();
  };

  document.addEventListener('keydown', onKey);
  window.addEventListener('scroll', onScroll, { passive: true });

  return () => {
    document.removeEventListener('keydown', onKey);
    window.removeEventListener('scroll', onScroll);
  };
}, [isOpen, closeDropdown]);


  // --- hover logic ------------------------------------------------
  const hoverTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const onEnter = () => {
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
    if (openTimer.current) clearTimeout(openTimer.current);
    setOverlayVisible(true);
    openTimer.current = setTimeout(() => openDropdown(false), 120);
  };

  const onLeave = (e: React.MouseEvent) => {
    const next = e.relatedTarget as Node | null;
    if (safeContains(containerRef.current, next)) return;

    if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
    hoverTimeout.current = setTimeout(() => {
      closeDropdown();
      setOverlayVisible(false);
    }, 200); // ← small delay prevents flicker
  };



  // --- NEW: close when hovering another top-level nav item --------
  useEffect(() => {
    if (!isOpen) return;

    const handlePointerOver = (e: PointerEvent) => {
      const container = containerRef.current;
      if (!container) return;
      const target = e.target as Element | null;
      if (!target) return;
      if (safeContains(container, target)) return;

      const navRoot =
        container.closest('[data-nav-root], nav, header, [role="navigation"]');
      if (!navRoot) return;

      const siblings = Array.from(navRoot.children);
      const hoveredSibling = siblings.find((child) => child.contains(target));

      if (hoveredSibling && hoveredSibling !== container) closeDropdown();
    };

    document.addEventListener('pointerover', handlePointerOver, true);
    return () => document.removeEventListener('pointerover', handlePointerOver, true);
  }, [isOpen, closeDropdown]);

  // --- cleanup ----------------------------------------------------
  useEffect(() => () => clearTimeouts([openTimer.current, overlayTimer.current]), [clearTimeouts]);

  // --- render -----------------------------------------------------
  return (
    <div
      ref={containerRef}
      className="relative z-[70]"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <div data-nav-item="true">
        <button
          ref={buttonRef}
          type="button"
          aria-haspopup="menu"
          aria-expanded={isOpen}
          onClick={handleButtonClick}
          className="group inline-flex items-center rounded-full border border-transparent bg-brand-secondary px-3 py-2 text-sm font-semibold text-white transition hover:text-brand-warning focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-warning focus-visible:ring-offset-2 focus-visible:ring-offset-brand-secondary dark:text-dark-text"
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
          <span>Account</span>
          <FiChevronDown aria-hidden="true" className="h-4 w-4 ml-1" strokeWidth={3.2} />
        </button>
      </div>

      {/* Overlay — starts below header, closes dropdown on hover */}
      <div
        className={`account-overlay fixed left-0 right-0 bottom-0 z-40 transition-opacity duration-300 ease-in-out ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        style={{ top: 'var(--header-height, 60px)' }}
        aria-hidden
        onClick={closeDropdown}
        onMouseEnter={() => {
          // close gracefully when user moves mouse onto overlay
          setTimeout(() => {
            closeDropdown();
          }, 120); // short fade delay for smooth UX
        }}
      />
      {/* Dropdown */}
      {isOpen && (
        <div
          className="absolute right-0 top-full z-[70] flex w-60 translate-x-10 flex-col"
          onMouseEnter={onEnter}
          onMouseLeave={onLeave}
        >
          <span className="block h-4" aria-hidden />
          <div
            ref={dropdownRef}
            role="menu"
            tabIndex={-1}
            className="rounded-lg border border-brand-muted/20 bg-brand-surface shadow-xl dark:border-dark-muted/20 dark:bg-dark-surface"
            onKeyDown={handleMenuKeyDown}
          >

            <ul className="px-7 pb-7 pt-6 text-sm text-brand-muted dark:text-dark-muted">
              <li>
                <Link
                  data-first-focus
                  href={loginHref as any}
                  onClick={closeDropdown}
                  className="mx-auto block w-36 rounded-lg border border-brand-primary bg-brand-primary px-4 py-2 text-center font-semibold text-white transition-colors
                            hover:bg-brand-secondary hover:text-white focus:text-white focus:ring-brand-warning
                            focus-visible:text-white focus-visible:bg-brand-primary focus-visible:text-brand-accent focus-visible:outline-none
                            focus-visible:ring-2 focus-visible:ring-brand-warning active:bg-brand-warning"
                >
                  Login
                </Link>
              </li>

              <li className="text-md text-center">
                <hr className="mt-4 mb-4" />
                <div className="text-center text-brand-text dark:text-dark-text">
                  New to eStores?
                </div>
                <Link
                  href={registerHref as any}
                  className="font-semibold text-brand-primary underline transition-colors hover:text-brand-secondary focus:text-brand-secondary active:text-brand-secondary dark:text-brand-primary"
                  onClick={closeDropdown}
                >
                  Register
                </Link>{' '}
                as a <strong>buyer</strong> or <strong>seller</strong> and start exploring!
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
