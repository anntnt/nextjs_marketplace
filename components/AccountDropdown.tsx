'use client';

import Link from 'next/link';
import { getSafeReturnToPath } from '../util/validation';
import { useMemo, useEffect, useRef, useState, useCallback } from 'react';
import type { MouseEvent as ReactMouseEvent } from 'react';
import { usePathname } from 'next/navigation';

export type AccountDropdownProps = {
  onOpenChange?: (open: boolean) => void;
};

const focusableSelectors =
  'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])';

export default function AccountDropdown({ onOpenChange }: AccountDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [openedByKeyboard, setOpenedByKeyboard] = useState(false);
  const [overlayReady, setOverlayReady] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // --- helpers ----------------------------------------------------
  const clearTimeouts = useCallback(
    (ids: (ReturnType<typeof setTimeout> | null)[]) => ids.forEach((id) => id && clearTimeout(id)),
    []
  );
  const openTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const overlayTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const safeContains = (parent?: Element | null, child?: Node | null): boolean =>
    !!parent && !!child && parent.contains(child);

  const currentPath =
    pathname && pathname !== '/login' && pathname !== '/register' ? pathname : '/';

  const loginHref = useMemo(() => {
    const sanitized = pathname && pathname !== '/login' ? pathname : undefined;
    const safe = getSafeReturnToPath(sanitized);
    return safe ? `/login?returnTo=${safe}` : '/login';
  }, [pathname]);

  const registerHref = useMemo(() => {
    if (!pathname || pathname === '/register') return '/register';
    return `/register?returnTo=${currentPath}`;
  }, [currentPath, pathname]);

  // --- open/close -------------------------------------------------
  const openDropdown = useCallback(
    (byKeyboard: boolean) => {
      clearTimeouts([openTimer.current, overlayTimer.current]);
      setOpenedByKeyboard(byKeyboard);
      setIsOpen(true);
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
    onOpenChange?.(false);
  }, [onOpenChange, clearTimeouts]);

  const handleButtonClick = (e: ReactMouseEvent<HTMLButtonElement>) => {
    const byKeyboard = e.detail === 0;
    isOpen ? closeDropdown() : openDropdown(byKeyboard);
  };

  // --- keyboard escape --------------------------------------------
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && closeDropdown();
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen, closeDropdown]);

  // --- hover logic ------------------------------------------------
  const onEnter = () => {
    if (openTimer.current) clearTimeout(openTimer.current);
    openTimer.current = setTimeout(() => openDropdown(false), 120);
  };
  const onLeave = (e: React.MouseEvent) => {
    const next = (e.relatedTarget as Node) ?? null;
    if (safeContains(containerRef.current, next)) return;
    if (openTimer.current) clearTimeout(openTimer.current);
    openTimer.current = setTimeout(() => closeDropdown(), 100);
  };

  // --- NEW: close when hovering another top-level nav item --------
  useEffect(() => {
    if (!isOpen) return;

    const handlePointerOver = (e: PointerEvent) => {
      const container = containerRef.current;
      if (!container) return;
      const target = e.target as Element | null;
      if (!target) return;

      // still inside dropdown? ignore
      if (safeContains(container, target)) return;

      // find nearest nav/header ancestor
      const navRoot =
        container.closest('[data-nav-root], nav, header, [role="navigation"]');
      if (!navRoot) return;

      // detect direct children of that nav root
      const siblings = Array.from(navRoot.children);
      const hoveredSibling = siblings.find((child) => child.contains(target));

      // if hoveredSibling exists and it's not the Account container → close
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
      className="relative z-[60]"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        onClick={handleButtonClick}
        className="cursor-pointer bg-brand-secondary hidden md:flex items-center gap-2 border-0 font-semibold text-white transition-colors hover:text-brand-warning focus:text-brand-warning active:text-brand-warning dark:text-dark-text dark:hover:text-brand-warning"
      >
        <svg
          className="h-6 w-6 text-white transition-colors group-hover:text-brand-warning"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            fillRule="evenodd"
            d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4h-4Z"
            clipRule="evenodd"
          />
        </svg>
        Account
      </button>

      {isOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 z-50 bg-gradient-to-b from-transparent via-black/60 to-black/70"
            aria-hidden
            onClick={closeDropdown}
            onMouseEnter={() => overlayReady && closeDropdown()}
          />

          {/* Dropdown */}
          <div
            className="absolute right-0 top-full z-[70] flex w-60 translate-x-10 flex-col"
            onMouseEnter={onEnter}
            onMouseLeave={onLeave}
          >
            <span className="block h-4" aria-hidden />
            <div className="rounded-lg border border-brand-muted/20 bg-brand-surface shadow-xl dark:border-dark-muted/20 dark:bg-dark-surface">
              <ul className="px-7 pb-7 pt-6 text-sm text-brand-muted dark:text-dark-muted">
                <li>
                  <Link
                    href={loginHref as any}
                    className="mx-auto block w-36 rounded-lg border border-brand-primary bg-brand-primary px-4 py-2 text-center font-semibold text-white transition-colors hover:bg-brand-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary/70 active:bg-brand-secondary/90"
                    onClick={closeDropdown}
                  >
                    Login
                  </Link>
                </li>
                <li className="text-md text-center">
                  <hr className="mb-4" />
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
        </>
      )}
    </div>
  );
}
