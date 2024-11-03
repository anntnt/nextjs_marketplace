import { cookies } from 'next/headers';

export async function getCookie(name: string) {
  const cookie = (await cookies()).get(name);
  if (!cookie) {
    return undefined;
  }
  return cookie.value;
}

export async function setCookie(name: string, value: string) {
  (await cookies()).set(name, value);
}

export async function deleteCookie(name: string) {
  (await cookies()).delete(name);
}

export const secureCookieOptions = {
  httpOnly: true,
  path: '/',
  sameSite: 'lax',
  secure: process.env.NODE_ENV === 'production',
  maxAge: 60 * 60 * 24, // This expires in 24 hours
} as const;
