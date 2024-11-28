import Link from 'next/link';
import { BsCart4 } from 'react-icons/bs';

type ItemsProps = { cartSum?: string };

export default function Component(props: ItemsProps) {
  const cartItems = props.cartSum;
  return (
    <div>
      <div className="text-white text-center rounded-full bg-red-500">
        <strong>
          <span data-test-id="cart-count" />
        </strong>
      </div>
      <Link
        href="/cart"
        className="text-black dark:text-white hover:text-blue-1000"
      >
        <div className="flex ">
          <div className=" flex h-6 w-6 items-center justify-center rounded-full bg-red-600 text-white ">
            <span data-test-id="cart-count">{cartItems}</span>
          </div>
        </div>

        <BsCart4 size={28} />
      </Link>
    </div>
  );
}
