import { cookies } from 'next/headers';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { BsCart4 } from 'react-icons/bs';
import type { User } from '../migrations/0001-createTableUsers';

type userProps = { user?: User };
export default function Component(props: userProps) {
  //const items = itemsFromCart();
  const items = 2;
  return (
    <div>
      <div className="text-white text-center rounded-full bg-red-500">
        <strong>
          <span data-test-id="cart-count"></span>
        </strong>
      </div>
      <Link
        href="/cart"
        className="text-black dark:text-white hover:text-blue-1000"
      >
        <div className="flex ">
          <div className=" flex h-7 w-7 items-center justify-center rounded-full bg-red-600 text-white ">
            <span data-test-id="cart-count">{items}</span>
          </div>
        </div>

        <BsCart4 size={30} />
      </Link>
    </div>
  );
}
