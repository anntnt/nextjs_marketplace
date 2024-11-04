import { AlignJustify, Apple } from 'lucide-react';
import Link from 'next/link';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet';

export default function MobileNav() {
  return (
    <div className="md:hidden">
      <Sheet>
        <SheetTrigger>
          <AlignJustify />
        </SheetTrigger>
        <SheetContent side="left">
          <Link href="/">
            <Apple className="text-red-500" />
          </Link>
          <nav className="flex flex-col gap-3 lg:gap-4 mt-6">
            <Link href="/products">Project</Link>
            <Link href="/cart">Contact</Link>
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
}
