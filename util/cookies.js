import { cookies } from 'next/headers';

export async function getCookie(name) {
  const cookie = (await cookies()).get(name);
  if (!cookie) {
    return undefined;
  }
  return cookie.value;
}

export async function setCookie(name, value) {
  (await cookies()).set(name, value);
}
