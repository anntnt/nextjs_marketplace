import './globals.css';
import { createElement, type ComponentProps, type ReactNode } from 'react';
import dynamic from 'next/dynamic';
import Footer from '../components/Footer';
import { getCartSum } from '../database/cartProducts';
import { getUser } from '../database/users';
import { getGuestCartTotalQuantity, parseGuestCartCookie } from '../util/guestCart';
import { cookies } from 'next/headers';

const headerComponent = dynamic(() => import('../components/Header'), { ssr: true });
type HeaderProps = ComponentProps<typeof headerComponent>;

function Header(props: HeaderProps) {
  return createElement(headerComponent, props);
}

export const metadata = {
  title: {
    default: 'Home | eStores',
    template: '%s | eStores',
  },
  description: 'eStores Marketplace',
};

type Props = {
  children: ReactNode;
};
export default async function RootLayout({ children }: Props) {
  // Display the logged in user's username in the navigation bar and hide the login and register links depending on whether the user is logged in or not
  // 1. Checking if the sessionToken cookie exists
  const cookieStore = await cookies();
  const sessionTokenCookie = cookieStore.get('sessionToken');
  const guestCartItems = parseGuestCartCookie(cookieStore.get('guestCart')?.value);
  const flashMessageCookie = cookieStore.get('flashMessage');
  const flashMessage = flashMessageCookie?.value;
  if (flashMessageCookie) {
    cookieStore.delete('flashMessage');
  }

  // 2. Get the current logged in user from the database using the sessionToken value
  const user = sessionTokenCookie && (await getUser(sessionTokenCookie.value));
  let cartSum = '0';

  if (sessionTokenCookie) {
    const cartSumResult = await getCartSum(sessionTokenCookie.value);
    if (cartSumResult && cartSumResult.totalamount) {
      cartSum = cartSumResult.totalamount;
    }
  }

  if (!sessionTokenCookie) {
    cartSum = getGuestCartTotalQuantity(guestCartItems).toString();
  }

  // 3. Make decision whether to show the login and register links or not
  return (
    <html lang="en">
      <body className="font-sans">
        <div className="flex flex-col h-screen bg-gray-50  antialiased dark:bg-gray-900">
          {flashMessage ? (
            <div
              className="bg-blue-100 text-blue-900 text-sm text-center py-2"
              role="status"
              aria-live="polite"
            >
              {flashMessage}
            </div>
          ) : null}
          <Header user={user} cartSum={cartSum} />

          <div id="page-content" tabIndex={-1} className="flex-1 focus:outline-none">
            {children}
          </div>

          <Footer />
        </div>
      </body>
    </html>
  );
}
