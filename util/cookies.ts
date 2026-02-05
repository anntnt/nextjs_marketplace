import { cookies } from 'next/headers';
import type { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';

const getCookieStore = async (): Promise<ReadonlyRequestCookies> => await cookies();

export async function getCookie(name: string): Promise<string | undefined> {
  const cookieStore = await getCookieStore();
  return cookieStore.get(name)?.value;
}

export async function setCookie(name: string, value: string): Promise<void> {
  const cookieStore = await getCookieStore();
  cookieStore.set(name, value);
}

export async function deleteCookie(name: string): Promise<void> {
  const cookieStore = await getCookieStore();
  cookieStore.delete(name);
}

export const secureCookieOptions = {
  httpOnly: true,
  path: '/',
  sameSite: 'lax',
  secure: process.env.NODE_ENV === 'production',
  maxAge: 60 * 60 * 24, // This expires in 24 hours
} as const;
