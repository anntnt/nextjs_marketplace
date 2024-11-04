import { Apple } from 'lucide-react';
import Link from 'next/link';

export default function MainNav() {
  return (
    <div className="hidden md:flex">
      <Link href="/">
        <Apple className="text-red-500" />
      </Link>
      <nav className="flex items-center gap-3 lg:gap-4 ml-8 ">
        <Link href="/products">Project</Link>
        <Link href="/cart">Contact</Link>
      </nav>
    </div>
  );
}
