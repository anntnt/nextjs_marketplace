'use client';

import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import { usePathname } from 'next/navigation';

type PageContentProps = {
  children: ReactNode;
};

export default function PageContent({ children }: PageContentProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const previousPathRef = useRef<string | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    if (previousPathRef.current === pathname) return;
    previousPathRef.current = pathname;

    requestAnimationFrame(() => {
      window.scrollTo({ top: 0 });
      try {
        container.focus({ preventScroll: true });
      } catch {
        container.focus();
      }
    });
  }, [pathname]);

  return (
    <div ref={containerRef} id="page-content" tabIndex={-1} className="flex-1 focus:outline-none">
      {children}
    </div>
  );
}
