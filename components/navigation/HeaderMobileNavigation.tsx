'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import type { User } from '../../migrations/0001-createTableUsers';
import HeaderMobileToggle from './HeaderMobileToggle';
import HeaderMobileMenu from './HeaderMobileMenu';
import { getSellerRegistrationHref } from '../../lib/navigation/links';

type UserProps = {
  user: User | undefined;
};

export default function HeaderMobileNavigation(props: UserProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const sellerRegisterHref = useMemo(
    () => getSellerRegistrationHref(pathname),
    [pathname],
  );

  const toggleMenu = () => setIsOpen((previous) => !previous);
  const closeMenu = () => setIsOpen(false);

  // Disable body scroll when mobile menu open
  useEffect(() => {
    if (!isOpen) {
      document.body.style.removeProperty('overflow');
      return;
    }
    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (previousOverflow) {
        document.body.style.overflow = previousOverflow;
      } else {
        document.body.style.removeProperty('overflow');
      }
    };
  }, [isOpen]);

  // Close menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <HeaderMobileToggle isOpen={isOpen} onToggle={toggleMenu} />

      <HeaderMobileMenu
        user={props.user}
        isOpen={isOpen}
        sellerRegisterHref={sellerRegisterHref}
        onClose={closeMenu}
      />
    </>
  );
}
