import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { getUser } from '@/api/user/getUser';
import { generateObject } from 'ai';
import { google } from '@ai-sdk/google';
import { z } from 'zod';

export async function GET(req: NextRequest) {
  try {
    const session = await getUser();

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '12', 10);

    const skip = (page - 1) * limit;

    const totalItems = await prisma.interview.count({
      where: { userId: session?.user?.id },
    });

    const interviews = await prisma.interview.findMany({
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit,
      where: {
        userId: session?.user?.id,
      },
    });

    const totalPages = Math.ceil(totalItems / limit);

    const hasNextPage = page === totalPages || totalPages === 0 ? false : true;
    const nextPage = page === totalPages || totalPages === 0 ? page : page + 1;

    const previoudPage = page === 1 || totalPages === 0 ? page : page - 1;

    return NextResponse.json({
      data: interviews,
      meta: {
        totalItems,
        totalPages,
        nextPage,
        previoudPage,
        hasNextPage,
      },
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.json(
      { error: 'Failed to fetch interviews' },
      { status: 500 }
    );
  }
}

const questionsSchema = z.object({
  questions: z
    .array(z.string())
    .max(10)
    .describe('An array of 10 or fewer interview questions.'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      title,
      companyName,
      jobDescription,
      description,
      scheduledDate,
      status,
      difficulty,
      interviewType,
      scheduleLater,
    } = body;

    const session = await getUser();

    const resumeData = await prisma.reusme.findUnique({
      where: {
        userId: session?.user?.id,
      },
    });

    // --- Craft a highly specific prompt for the AI ---
    let promptInstructions = '';

    // Dynamically change instructions based on interview type
    switch (interviewType) {
      case 'TECHNICAL':
        promptInstructions = `
          Generate technical questions. Focus on the skills and experience provided in the resume and the job description.
          The questions should be practical and test the candidate's coding and technical knowledge.
        `;
        break;
      case 'BEHAVIORAL':
        promptInstructions = `
          Generate behavioral questions. Use the STAR (Situation, Task, Action, Result) method.
          Focus on past projects and work experiences from the resume.
        `;
        break;
      case 'SYSTEM_DESIGN':
        promptInstructions = `
          Generate a system design question. The question should be open-ended and challenge the candidate to design a system related to the job role or company.
        `;
        break;
      case 'CULTURAL_FIT':
        promptInstructions = `
          Generate questions to assess cultural fit. Focus on teamwork, problem-solving, and how the candidate aligns with the company culture.
        `;
        break;
      default:
        promptInstructions = `
          Generate a mix of technical and behavioral questions.
        `;
    }

    // Adjust the persona based on whether a company name is provided
    const persona = companyName
      ? `You are an experienced hiring manager at ${companyName}, interviewing a candidate for the ${title} position.`
      : `You are an experienced hiring manager, interviewing a candidate for the ${title} position.`;

    const prompt = `
      ${persona}

      Here is all the context you have:
      - **Candidate Resume Data:**
        ${JSON.stringify(resumeData, null, 2)}
      
      - **Job Description:**
        ${jobDescription || 'N/A'}
      
      - **Interviewer's Notes:**
        ${description || 'N/A'}
      
      - **Interview Details:**
        - Type: ${interviewType}
        - Difficulty: ${difficulty}

      ${promptInstructions}
      
      Your task is to generate a list of 3 or fewer interview questions tailored to the candidate's profile and the job context.
      
      The questions should be a mix of the specified type (${interviewType}) and difficulty (${difficulty}).
      
      The questions are going to be read by an AI VOICE assistant so do not use "/" or "*" or any other special characters that might break the voice assistance.
      
      Return the questions formatted like this:
      ["Question 1", "Question 2", "Question 3"]
    `;

    const result = await generateObject({
      model: google('gemini-1.5-flash'),
      schema: questionsSchema,
      prompt: prompt,
    });

    const questionsArray = result?.object?.questions;

    const newInterview = await prisma.interview.create({
      data: {
        companyName: companyName,
        description: description,
        jobDescription: jobDescription,
        title: title,
        interviewType: interviewType,
        status: status,
        difficulty: difficulty,
        userId: session?.user?.id || '',
        scheduleLater: scheduleLater,
        ...(scheduleLater && {
          scheduledDate: scheduledDate,
        }),
        questions: questionsArray,
      },
    });

    return NextResponse.json({
      data: newInterview,
    });
    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.json(
      { error: 'Failed to create interview.' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      title,
      companyName,
      jobDescription,
      description,
      scheduledDate,
      status,
      difficulty,
      interviewType,
      scheduleLater,
      id,
    } = body;

    const session = await getUser();

    const resumeData = await prisma.reusme.findUnique({
      where: {
        userId: session?.user?.id,
      },
    });

    let promptInstructions = '';

    switch (interviewType) {
      case 'TECHNICAL':
        promptInstructions = `
          Generate technical questions. Focus on the skills and experience provided in the resume and the job description.
          The questions should be practical and test the candidate's coding and technical knowledge.
        `;
        break;
      case 'BEHAVIORAL':
        promptInstructions = `
          Generate behavioral questions. Use the STAR (Situation, Task, Action, Result) method.
          Focus on past projects and work experiences from the resume.
        `;
        break;
      case 'SYSTEM_DESIGN':
        promptInstructions = `
          Generate a system design question. The question should be open-ended and challenge the candidate to design a system related to the job role or company.
        `;
        break;
      case 'CULTURAL_FIT':
        promptInstructions = `
          Generate questions to assess cultural fit. Focus on teamwork, problem-solving, and how the candidate aligns with the company culture.
        `;
        break;
      default:
        promptInstructions = `
          Generate a mix of technical and behavioral questions.
        `;
    }

    const persona = companyName
      ? `You are an experienced hiring manager at ${companyName}, interviewing a candidate for the ${title} position.`
      : `You are an experienced hiring manager, interviewing a candidate for the ${title} position.`;

    const prompt = `
      ${persona}

      Here is all the context you have:
      - **Candidate Resume Data:**
        ${JSON.stringify(resumeData, null, 2)}
      
      - **Job Description:**
        ${jobDescription || 'N/A'}
      
      - **Interviewer's Notes:**
        ${description || 'N/A'}
      
      - **Interview Details:**
        - Type: ${interviewType}
        - Difficulty: ${difficulty}

      ${promptInstructions}
      
      Your task is to generate a list of 10 or fewer interview questions tailored to the candidate's profile and the job context.
      
      The questions should be a mix of the specified type (${interviewType}) and difficulty (${difficulty}).
      
      The questions are going to be read by an AI VOICE assistant so do not use "/" or "*" or any other special characters that might break the voice assistance.
      
      Return the questions formatted like this:
      ["Question 1", "Question 2", "Question 3"]
    `;

    const result = await generateObject({
      model: google('gemini-1.5-flash'),
      schema: questionsSchema,
      prompt: prompt,
    });

    const questionsArray = result?.object?.questions;

    const updatedInterview = await prisma.interview.update({
      where: {
        id,
      },
      data: {
        companyName: companyName,
        description: description,
        jobDescription: jobDescription,
        title: title,
        interviewType: interviewType,
        status: status,
        difficulty: difficulty,
        userId: session?.user?.id || '',
        scheduleLater: scheduleLater,
        ...(scheduleLater && {
          scheduledDate: scheduledDate,
        }),
        questions: questionsArray,
      },
    });

    return NextResponse.json({
      data: updatedInterview,
    });
    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.json(
      { error: 'Failed to create interview.' },
      { status: 500 }
    );
  }
}
