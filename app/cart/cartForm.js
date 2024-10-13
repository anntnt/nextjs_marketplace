'use client';
import { useRouter } from 'next/navigation';
import deleteProductFromCartCookie from './action.js';

// import styles from './productForm.scss';

export default function cartForm(props) {
  const router = useRouter;
  return (
    <div>
      <form>
        <button
          formAction={async () => {
            await deleteProductFromCartCookie(props.productId);
            // reload Cart page
            // router.refresh();
          }}
          data-test-id={`cart-product-remove-${props.productId}`}
        >
          Remove
        </button>
      </form>
    </div>
  );
}
