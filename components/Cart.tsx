import { cookies } from 'next/headers';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { BsCart4 } from 'react-icons/bs';
import type { User } from '../migrations/0001-createTableUsers';
import itemsFromCart from '../util/itemsFromCart';

type userProps = { user?: User };
export default function Component(props: userProps) {
  const items = itemsFromCart();
  return (
    <div>
      <Link
        href="/cart"
        className="text-black dark:text-white hover:text-blue-1000"
      >
        <BsCart4 size={30} />
        <strong>
          Cart (<span data-test-id="cart-count">{items}</span>)
        </strong>
      </Link>
    </div>
  );
}
