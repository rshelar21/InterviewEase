import prisma from '@/lib/db';
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

export async function getUserInfo() {
  const session = await getUser();

  const user = await prisma.user.findUnique({
    where: {
      id: session.user?.id,
    },
    include: {
      Reusme: true,
    },
  });

  return user;
}
