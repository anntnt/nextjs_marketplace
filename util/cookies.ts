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
