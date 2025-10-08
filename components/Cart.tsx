import Link from 'next/link';
import { BsCart4 } from 'react-icons/bs';

type ItemsProps = { cartSum?: string };

export default function Component(props: ItemsProps) {
  const cartItems = props.cartSum ?? '0';
  return (
    <div className="sm:me-5">
      <Link
        href="/cart"
        className="relative inline-flex items-center text-white transition-colors hover:text-brand-warning dark:text-dark-text dark:hover:text-brand-warning"
      >
        <BsCart4 size={28} />
        <span
          className="absolute -top-1 -right-2 flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-brand-primary px-1 text-xs font-bold text-white"
          data-test-id="cart-count"
        >
          {cartItems}
        </span>
      </Link>
    </div>
  );
}
