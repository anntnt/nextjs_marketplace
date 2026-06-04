import type { User } from '../../migrations/0001-createTableUsers';
import { canSeeCart, isSeller } from '../../lib/navigation/header';
import HeaderMobileNavigation from './HeaderMobileNavigation';
import Search from '../features/Search';
import HeaderLogo from './HeaderLogo';
import HeaderDesktopActions from './HeaderDesktopActions';

type HeaderProps = {
  user: User | undefined;
  cartSum?: string;
};

export default function Header({ user, cartSum }: HeaderProps) {
  const showCart = canSeeCart(user);
  const userIsSeller = isSeller(user);

  return (
    <header className="fixed top-0 left-0 right-0 z-[60] border-b border-brand-secondary/50 bg-brand-secondary text-white shadow-lg transition-colors dark:border-dark-muted/40 dark:bg-dark-surface dark:text-dark-text">
      <nav className="py-3.5 sm:py-3 relative z-[60]">
        <div className="mx-auto flex w-full max-w-screen-2xl items-center gap-4 px-2 sm:px-4 lg:px-6">
          <HeaderLogo />

          <div className="flex flex-1 flex-wrap items-center gap-4 md:gap-6">
            <div className="hidden flex-1 items-center justify-center md:flex">
              <div className="w-full max-w-2xl lg:max-w-3xl">
                <Search placeholder="Search products" className="w-full" />
              </div>
            </div>

            <div className="ml-auto flex items-center gap-3 md:gap-6">
              <HeaderDesktopActions
                user={user}
                cartSum={cartSum}
                showCart={showCart}
                isSeller={userIsSeller}
              />

              <HeaderMobileNavigation user={user} />
            </div>
          </div>
        </div>

        <div className="order-last mt-3 w-full basis-full md:hidden">
          <div className="flex w-full justify-center px-2">
            <Search placeholder="Search products" className="w-full max-w-md" />
          </div>
        </div>
      </nav>
    </header>
  );
}
