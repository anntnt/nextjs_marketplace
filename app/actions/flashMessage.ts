'use server';

import { cookies } from 'next/headers';

export async function clearFlashMessage() {
  const cookieStore = await cookies();
  if (!cookieStore.get('flashMessage')) return;

  cookieStore.delete('flashMessage');
}
