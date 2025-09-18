'use server';

import { getUser } from '@/api/user/getUser';
import prisma from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function deleteResume() {
  const session = await getUser();

  await prisma.reusme.delete({
    where: {
      userId: session?.user?.id,
    },
  });

  revalidatePath('/profile');

  return {
    message: 'Deleted Succefully',
  };
}
