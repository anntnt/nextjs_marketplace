import './globals.scss';
import localFont from 'next/font/local';
import { cookies } from 'next/headers';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { getUser } from '../database/users';
import itemsFromCart from '../util/itemsFromCart';
import LogoutButton from './(auth)/logout/LogoutButton';
import Header from './components/Header';
import styles from './page.module.scss';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata = {
  title: {
    default: 'Home | Tropical Snacks',
    template: '%s | Tropical Snacks',
  },
  description: 'Delicious snack food from the tropics',
};

type Props = {
  children: ReactNode;
};
export default async function RootLayout({ children }: Props) {
  const items = itemsFromCart();
  // Task: Display the logged in user's username in the navigation bar and hide the login and register links depending on whether the user is logged in or not
  // 1. Checking if the sessionToken cookie exists
  const sessionTokenCookie = (await cookies()).get('sessionToken');

  // 2. Get the current logged in user from the database using the sessionToken value
  const user = sessionTokenCookie && (await getUser(sessionTokenCookie.value));

  // console.log('User: ', user);

  // 3. Make decision whether to show the login and register links or not
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        <header>
          <nav>
            <Link href="/">Home</Link>
            <Link href="/products" data-test-id="products-link">
              Products
            </Link>
            <Link href="/cart" data-test-id="cart-link">
              <strong>
                Cart (<span data-test-id="cart-count">{items}</span>)
              </strong>
            </Link>
            <div>
              {user ? (
                <>
                  <Link href={`/profile/${user.username}`}>
                    {user.username}
                  </Link>
                  <LogoutButton />
                </>
              ) : (
                <>
                  <Link href="/register">Register</Link>
                  <Link href="/login">Login</Link>
                </>
              )}
            </div>
          </nav>
        </header>
        <main className={`${styles.main}`}>{children}</main>

        <footer>
          <div>MarketLink 2024</div>
        </footer>
      </body>
    </html>
  );
}
