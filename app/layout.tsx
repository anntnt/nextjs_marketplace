// import './globals.scss';
import { Inter } from 'next/font/google';
import localFont from 'next/font/local';
import { cookies } from 'next/headers';
import Link from 'next/link';
import type { ReactNode } from 'react';
import Header from '../components/Header';
import { TailwindIndicator } from '../components/tailwind-indicator';
import { getUser } from '../database/users';
import itemsFromCart from '../util/itemsFromCart';
import LogoutButton from './(auth)/logout/LogoutButton';

// import styles from './page.module.scss';

const inter = Inter({ subsets: ['latin'] });

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
      <body className={inter.className}>
        <Header />

        {children}
        <TailwindIndicator />

        <footer>
          <div>MarketLink 2024</div>
        </footer>
      </body>
    </html>
  );
}
