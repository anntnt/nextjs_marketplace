import './globals.scss';
import localFont from 'next/font/local';
import Link from 'next/link';
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

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header>
          <nav>
            <Link href="/">Home</Link>
            <Link href="/about">About</Link>
            <Link href="/products">Products</Link>
            <Link href="/cart">Cart</Link>
          </nav>
        </header>
        <main className={`${styles.main}`}>{children}</main>

        <footer ><div>Tropical Snacks 2024</div></footer>
      </body>
    </html>
  );
}
