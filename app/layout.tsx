import './globals.css';
import { Inter } from 'next/font/google';
import localFont from 'next/font/local';
import { cookies } from 'next/headers';
import Link from 'next/link';
import type { ReactNode } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { getUser } from '../database/users';
import type { User } from '../migrations/0002-createTableUsers';
import itemsFromCart from '../util/itemsFromCart';
import LogoutButton from './(auth)/logout/LogoutButton';

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
    default: 'Home | Vilya',
    template: '%s | Vilya',
  },
  description: 'Vilya Marketplace',
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
        <div className="flex flex-col h-screen">
          <Header user={user} />
          {/*flex flex-col min-h-screen on the outer div makes the layout stretch to fill the viewport. */}

          {/* Main Content */}
          {/* flex-grow allows it to expand and take up any available space between the header */}

          <main className="flex-grow  w-full max-w-full px-20 py-12">
            {/* Your page content goes here */}
            {children}
          </main>

          <Footer />
        </div>
      </body>
    </html>
  );
}
