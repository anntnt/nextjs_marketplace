import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Sell',
  description: 'Sell',
};

export default function Page() {
  redirect('/register/seller');
}
