'use server';
import { getUser } from '@/data/user';
import prisma from '@/lib/db';
import { CreateContactsType } from '@/types';
import { tryCatch } from '@/lib/try-catch';

export async function createSupportQuery(body: CreateContactsType) {
  const { data, error } = await tryCatch(async () => {
    const session = await getUser();

    const user = await prisma.user.findUnique({
      where: { id: session?.user?.id },
    });

    if (!user) {
      throw new Error('User does not exist');
    }

    return await prisma.contact.create({
      data: {
        description: body?.description,
        subject: body?.subject,
        userId: user?.id as string,
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
