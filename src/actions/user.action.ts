'use server';
import { getUser } from '@/data/user';
import prisma from '@/lib/db';
import { User } from '@prisma/client';
import { tryCatch } from '@/lib/try-catch';

export async function updateUserPreference(body: Partial<User>) {
  const { data, error } = await tryCatch(async () => {
    const session = await getUser();

    await prisma.user.update({
      where: {
        id: session?.user?.id,
      },
      data: {
        ...body,
      },
    });
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
