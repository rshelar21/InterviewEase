'use server';
import { getUser } from '@/api/user/getUser';
import { Interview } from '@/types';
import prisma from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function createInterview(data: Interview) {
  const session = await getUser();

  const res = await prisma.interview.create({
    data: {
      companyName: data?.companyName,
      description: data?.description,
      jobDescription: data?.jobDescription,
      title: data?.title,
      interviewType: data?.interviewType,
      status: data?.status,
      difficulty: data?.difficulty,
      userId: session?.user?.id || '',
      scheduleLater: data?.scheduleLater,
      ...(data?.scheduleLater && {
        scheduledDate: data?.scheduledDate,
      }),
    },
  });
  revalidatePath('/interviews');
  return res;
}

export async function deleteInterview(interviewId: string) {
  const session = await getUser();

  const existingInterview = await prisma.interview.findUnique({
    where: {
      id: interviewId,
    },
  });

  if (!existingInterview) {
    // return not found
  }

  if (existingInterview?.userId !== session?.user?.id) {
    // return error
  }

  await prisma.interview.delete({ where: { id: interviewId } });
  revalidatePath('/interviews');

  return {
    message: 'Deleted Succefully',
  };
}

export async function updateInterview(id: string, data: Interview) {
  const session = await getUser();

  const existingInterview = await prisma.interview.findUnique({
    where: {
      id,
    },
  });

  if (!existingInterview) {
    // return not found
  }

  const interview = await prisma.interview.update({
    where: {
      id,
    },
    data: {
      companyName: data?.companyName,
      description: data?.description,
      jobDescription: data?.jobDescription,
      title: data?.title,
      interviewType: data?.interviewType,
      status: data?.status,
      difficulty: data?.difficulty,
      userId: session?.user?.id || '',
      scheduleLater: data?.scheduleLater,
      ...(data?.scheduleLater && {
        scheduledDate: data?.scheduledDate,
      }),
    },
  });

  revalidatePath('/interviews');
  return interview;
}
