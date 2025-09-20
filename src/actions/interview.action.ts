'use server';
import { getUser } from '@/data/user';
import prisma from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { generateObject } from 'ai';
import { google } from '@ai-sdk/google';
import { feedbackSchema } from '@/constants/interviewer';
import { tryCatch } from '@/lib/try-catch';

interface SendMessage {
  role: 'user' | 'system' | 'assistanr';
  content: string;
}

export async function deleteInterview(interviewId: string) {
  const { data, error } = await tryCatch(async () => {
    const session = await getUser();

    const existingInterview = await prisma.interview.findUnique({
      where: {
        id: interviewId,
      },
    });

    if (!existingInterview) {
      throw new Error('Interview not found');
    }

    if (existingInterview?.userId !== session?.user?.id) {
      throw new Error('Not allow to delete');
    }

    await prisma.interview.delete({ where: { id: interviewId } });
    revalidatePath('/interviews');
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

export async function createFeedback(params: {
  interviewId: string;
  transcript: SendMessage[];
  duration: string;
}) {
  const { interviewId, transcript, duration } = params;

  const { data, error } = await tryCatch(async () => {
    await getUser();
    const formattedTranscript = transcript
      .map(
        (sentence: { role: string; content: string }) =>
          `- ${sentence.role}: ${sentence.content}\n`
      )
      .join('');

    const { object } = await generateObject({
      model: google('gemini-1.5-flash'),
      schema: feedbackSchema,
      prompt: `
    **Interview Transcript:**
    ${formattedTranscript}

    **Task:**
    Analyze the provided interview transcript and generate a structured JSON object according to the schema. Follow all instructions precisely.

    **Instructions:**
    1.  **Overall Score:** Provide a single total score from 0-100 that represents the candidate's overall performance. Be critical in your scoring.
    2.  **Category Scores:** For each of the five categories listed below, provide a score from 0-100 and a detailed, analytical comment. Do not add or change any category names.
    3.  **Strengths:** Identify and list at least 3 distinct strengths demonstrated by the candidate. List them as a concise bulleted list. If the candidate has fewer than 3 strengths, list all that you can find. If you find no strengths, state this explicitly.
    4.  **Areas for Improvement:** Identify and list at least 3 distinct areas where the candidate could improve. List them as a concise bulleted list.
    5.  **Rating:** Provide a final rating on a scale from 1 to 5, where 1 is "Poor" and 5 is "Excellent."

    **Categories to Score:**
    - Communication Skills
    - Technical Knowledge
    - Problem-Solving
    - Cultural & Role Fit
    - Confidence & Clarity

    **Constraints:**
    - Do not include any conversational text or filler outside of the JSON object.
    - Your response must be the JSON object only.
    - Ensure all generated strings are well-formed and do not contain special characters that would break JSON.
    `,
      system:
        'You are a professional and highly critical technical interviewer and performance analyst.',
    });

    const {
      areasForImprovement,
      categoryScores,
      strengths,
      totalScore,
      rating,
    } = object;

    const newFeedback = await prisma.feedback.create({
      data: {
        interviewId,
        improvements: areasForImprovement,
        strengths: strengths,
      },
    });

    if (categoryScores?.length) {
      await prisma.categoryScore.createMany({
        // eslint-disable-next-line  @typescript-eslint/no-explicit-any
        data: categoryScores?.map((score: any) => ({
          comment: score.comment,
          score: score.score,
          name: score.name,
          feedbackId: newFeedback.id, //
        })),
      });
    }

    const updatedInterview = await prisma.interview.update({
      where: {
        id: interviewId,
      },
      data: {
        duration,
        score: totalScore,
        status: 'COMPLETED',
        rating,
      },
    });

    return updatedInterview;
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
