import './globals.scss';
import localFont from 'next/font/local';
import Link from 'next/link';
import type { ReactNode } from 'react';
import itemsFromCart from '../util/itemsFromCart';
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
export default function RootLayout({ children }: Props) {
  const items = itemsFromCart();
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header>
          <nav>
            <Link href="/">Home</Link>
            <Link href="/products" data-test-id="products-link">
              Products
            </Link>
            <Link href="/cart" data-test-id="cart-link">
              <strong>
                Cart (<span data-test-id="cart-count">{items})</span>
              </strong>
            </Link>
          </nav>
        </header>
        <main className={`${styles.main}`}>{children}</main>

        <footer>
          <div>Tropical Snacks 2024</div>
        </footer>
      </body>
    </html>
  );
}
