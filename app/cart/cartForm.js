'use client';

import deleteProductFromCartCookie from './action';

// import styles from './productForm.scss';

export default function cartForm(props) {
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
