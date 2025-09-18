'use server';
import prisma from '@/lib/db';

export async function getIntervieDetails(id: string) {
  const interview = await prisma.interview.findUnique({
    where: {
      id,
    },
  });

  return interview;
}

export async function getInterviewFeedback(id: string) {
  const feedback = await prisma.feedback.findUnique({
    where: {
      interviewId: id,
    },
    select: {
      categoryScores: true,
      id: true,
      improvements: true,
      createdAt: true,
      strengths: true,
      Interview: true,
    },
  });
  return feedback;
}
