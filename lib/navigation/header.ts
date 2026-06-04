import type { User } from '../../migrations/0001-createTableUsers';

export function canSeeCart(user: User | undefined) {
  return !user || user.roleId === 3;
}

export function isSeller(user: User | undefined) {
  return user?.roleId === 2;
}
