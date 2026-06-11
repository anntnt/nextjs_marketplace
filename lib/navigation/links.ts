import type { Route } from 'next';
import { getSafeReturnToPath } from '../validation/returnTo';

const registerPaths = ['/register', '/register/seller', '/register/buyer'];

export function getSellerRegistrationHref(pathname: string | null): Route {
  const safePathname = pathname ? getSafeReturnToPath(pathname) : undefined;

  if (!safePathname || registerPaths.includes(safePathname)) {
    return '/register/seller';
  }

  return `/register/seller?returnTo=${encodeURIComponent(safePathname)}` as Route;
}
