import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { getUser } from '@/api/user/getUser';
import { generateObject } from 'ai';
import { google } from '@ai-sdk/google';
import { z } from 'zod';

export async function GET() {
  const session = await getUser();
  try {
    const res = await prisma.reusme.findUnique({
      where: {
        userId: session?.user?.id,
      },
    });
    return NextResponse.json({
      data: res,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.json(
      { error: 'Failed to fetch resume' },
      { status: 500 }
    );
  }
}

const resumeSchema = z.object({
  work_experience: z.array(
    z.object({
      job_title: z.string().describe('The job title or position held.'),
      company_name: z.string().describe('The name of the company.'),
      start_date: z
        .string()
        .describe(
          'The start date of the employment (e.g., "May 2020", "2020").'
        ),
      end_date: z
        .string()
        .describe(
          'The end date of the employment (e.g., "Present", "August 2022").'
        ),
      description: z
        .array(z.string())
        .optional()
        .describe('A list of key responsibilities and achievements.'),
    })
  ),
  skills: z
    .array(z.string())
    .describe(
      'A list of all skills mentioned in the resume (e.g., "Python", "JavaScript").'
    ),
  education: z.array(
    z.object({
      degree: z
        .string()
        .describe('The degree earned (e.g., "B.S. in Computer Science").'),
      institution: z
        .string()
        .describe('The name of the educational institution.'),
      graduation_year: z
        .string()
        .optional()
        .describe('The year of graduation.'),
    })
  ),
});

export async function POST(request: NextRequest) {
  try {
    const session = await getUser();
    const body = await request.json();
    const { fileName } = body;

    // Read the JSON body to get the URL
    const { searchParams } = new URL(request.url);
    const pdf_url = searchParams.get('pdf_url');

    if (!pdf_url) {
      return NextResponse.json(
        { error: 'No PDF URL provided.' },
        { status: 400 }
      );
    }

    // --- Fetch the PDF content from the URL ---
    const response = await fetch(pdf_url);
    if (!response.ok) {
      return NextResponse.json(
        { error: `Failed to fetch PDF from URL: ${response.statusText}` },
        { status: response.status }
      );
    }

    // Get the file content as an ArrayBuffer
    const fileBytes = await response.arrayBuffer();

    // Use AI SDK to extract structured data
    const result = await generateObject({
      model: google('gemini-1.5-flash'),
      schema: resumeSchema,
      // prompt: `
      //   Analyze the provided resume PDF and extract the following information: work experience, skills, and education details.
      //   Strictly adhere to the provided JSON schema.
      // `,
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: 'Analyze the provided resume PDF and extract the following information: work experience, skills, and education details. Strictly adhere to the provided JSON schema.',
            },
            {
              type: 'file',
              data: new Uint8Array(fileBytes), // The file data is now available
              mediaType: 'application/pdf',
            },
          ],
        },
      ],
    });

    const newResume = await prisma.reusme.create({
      data: {
        content: result.object,
        name: fileName,
        resumeUrl: pdf_url,
        userId: session?.user?.id || '',
      },
    });

    return NextResponse.json({
      message: 'Resume data extracted and saved successfully.',
      data: result,
      resume: newResume,
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.json(
      { error: 'Failed to process resume.' },
      { status: 500 }
    );
  }
}
