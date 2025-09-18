'use server';
import { getUser } from '@/api/user/getUser';
import { Interview } from '@/types';
import prisma from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { generateObject } from 'ai';
import { google } from '@ai-sdk/google';
import { feedbackSchema } from '@/constants/interviewer';

interface SendMessage {
  role: 'user' | 'system' | 'assistanr';
  content: string;
}

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

export async function createFeedback(params: {
  interviewId: string;
  transcript: SendMessage[];
  duration: string;
}) {
  await getUser();
  const { interviewId, transcript, duration } = params;

  try {
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

    // const { object } = await generateObject({
    //   model: google('gemini-1.5-flash'),
    //   schema: feedbackSchema,
    //   prompt: `
    //     You are an AI interviewer analyzing a mock interview. Your task is to evaluate the candidate based on structured categories. Be thorough and detailed in your analysis. Don't be lenient with the candidate. If there are mistakes or areas for improvement, point them out.
    //     Transcript:
    //     ${formattedTranscript}

    //     Please score the candidate from 0 to 100 in the following areas. Do not add categories other than the ones provided:
    //     - **Communication Skills**: Clarity, articulation, structured responses.
    //     - **Technical Knowledge**: Understanding of key concepts for the role.
    //     - **Problem-Solving**: Ability to analyze problems and propose solutions.
    //     - **Cultural & Role Fit**: Alignment with company values and job role.
    //     - **Confidence & Clarity**: Confidence in responses, engagement, and clarity.
    //     `,
    //   system:
    //     'You are a professional interviewer analyzing a mock interview. Your task is to evaluate the candidate based on structured categories',
    // });

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

    await prisma.interview.update({
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

    return {
      success: true,
      id: interviewId,
      message: 'success',
    };
    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.message === 'Unauthorized') {
      return {
        success: false,
        id: interviewId,
        message: 'Unauthorized',
      };
    }
    return {
      success: false,
      id: interviewId,
      message: 'failed',
    };
  }
}
