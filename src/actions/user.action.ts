'use server';
import { getUser } from '@/api/user/getUser';
import prisma from '@/lib/db';
import { User } from '@prisma/client';

export async function updateUserPreference(body: Partial<User>) {
  const session = await getUser();

  await prisma.user.update({
    where: {
      id: session?.user?.id,
    },
    data: {
      ...body,
    },
  });

  //   revalidatePath('/');

  return {
    message: 'Updated Succefully',
  };
}
