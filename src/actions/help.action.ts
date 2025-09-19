'use server';
import { getUser } from '@/api/user/getUser';
import prisma from '@/lib/db';
import { CreateContactsType } from '@/types';

export async function createSupportQuery(data: CreateContactsType) {
  const session = await getUser();

  const contact = await prisma.contact.create({
    data: {
      description: data?.description,
      subject: data?.subject,
      userId: session?.user?.id || '',
    },
  });

  return {
    success: true,
    contact,
  };
}
