'use server';

import { cookies } from 'next/headers';
import {
  FLASH_MESSAGE_COOKIE,
  FLASH_MESSAGE_TYPE_COOKIE,
  type FlashMessageType,
} from '../../lib/flashMessage';

export async function setFlashMessage(message: string, type: FlashMessageType = 'info') {
  const cookieStore = await cookies();

  cookieStore.set({
    name: FLASH_MESSAGE_COOKIE,
    value: message,
    path: '/',
    sameSite: 'lax',
    maxAge: 5,
  });

  cookieStore.set({
    name: FLASH_MESSAGE_TYPE_COOKIE,
    value: type,
    path: '/',
    sameSite: 'lax',
    maxAge: 5,
  });
}
