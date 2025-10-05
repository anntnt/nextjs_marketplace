import Link from 'next/link';
import { BsCart4 } from 'react-icons/bs';

type ItemsProps = { cartSum?: string };

export default function Component(props: ItemsProps) {
  const cartItems = props.cartSum ?? '0';
  return (
    <div className="sm:me-5">
      <Link
        href="/cart"
        className="relative inline-flex items-center text-black hover:text-blue-1000 dark:text-white"
      >
        <BsCart4 size={28} />
        <span
          className="absolute -top-1 -right-2 flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-red-600 px-1 text-xs font-bold text-white"
          data-test-id="cart-count"
        >
          {cartItems}
        </span>
      </Link>
    </div>
  );
}
