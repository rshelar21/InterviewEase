'use server';

import { getUser } from '@/data/user';
import prisma from '@/lib/db';
import { tryCatch } from '@/lib/try-catch';
import { revalidatePath } from 'next/cache';

export async function deleteResume() {
  const { data, error } = await tryCatch(async () => {
    const session = await getUser();

    const user = await prisma.user.findUnique({
      where: { id: session?.user?.id },
    });

    if (!user) {
      throw new Error('User does not exist');
    }

    await prisma.reusme.delete({
      where: {
        userId: session?.user?.id,
      },
    });

    revalidatePath('/profile');
  });

  if (error) {
    const message =
      error instanceof Error
        ? error.message
        : 'Something went wrong, Please try again';
    throw new Error(message);
  }
  return data;
}
