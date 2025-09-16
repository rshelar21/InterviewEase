import { auth } from '@/lib/auth';
import { cache } from 'react';

export const getUser = cache(async () => {
  const session = await auth();
  // if (!session?.user) {
  //   redirect('/');
  // }

  if (!session?.user) {
    throw new Error('Unauthorized');
  }
  return session;
});
