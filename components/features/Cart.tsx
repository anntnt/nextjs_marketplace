import Link from 'next/link';
import { BsCart4 } from 'react-icons/bs';
import type { HTMLAttributes } from 'react';

type ItemsProps = { cartSum?: string } & HTMLAttributes<HTMLDivElement>;

export default function Component({ cartSum, className, ...divProps }: ItemsProps) {
  const cartItems = cartSum ?? '0';
  const containerClass = className ? `sm:me-5 ${className}` : 'sm:me-5';

  return (
    <div className={containerClass} {...divProps}>
      <Link
        data-nav-cart-link
        href="/cart"
        className="relative inline-flex items-center text-white transition-colors hover:text-brand-warning dark:text-dark-text dark:hover:text-brand-warning"
      >
        <BsCart4 size={28} />
        <span
          className="absolute -top-1 -right-2 flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-brand-accent px-1 text-xs font-bold text-white"
          data-test-id="cart-count"
        >
          {cartItems}
        </span>
      </Link>
    </div>
  );
}
