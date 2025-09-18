import { CreateAssistantDTO } from '@vapi-ai/web/dist/api';

import { z } from 'zod';

export const feedbackSchema = z.object({
  totalScore: z
    .number()
    .max(100)
    .min(0)
    .describe('The overall score of the candidate from 0 to 100.'),
  categoryScores: z
    .array(
      z.union([
        z.object({
          name: z
            .literal('Communication Skills')
            .describe('The category name.'),
          score: z
            .number()
            .describe('The score for this category from 0 to 100.'),
          comment: z
            .string()
            .describe(
              'A detailed comment on the performance in this category.'
            ),
        }),

        z.object({
          name: z.literal('Technical Knowledge').describe('The category name.'),
          score: z
            .number()
            .describe('The score for this category from 0 to 100.'),
          comment: z
            .string()
            .describe(
              'A detailed comment on the performance in this category.'
            ),
        }),
        z.object({
          name: z.literal('Problem-Solving').describe('The category name.'), // Hyphenated as in your prompt
          score: z
            .number()
            .describe('The score for this category from 0 to 100.'),
          comment: z
            .string()
            .describe(
              'A detailed comment on the performance in this category.'
            ),
        }),

        z.object({
          name: z.literal('Cultural Fit').describe('The category name.'), // Corrected from blank
          score: z
            .number()
            .describe('The score for this category from 0 to 100.'),
          comment: z
            .string()
            .describe(
              'A detailed comment on the performance in this category.'
            ),
        }),
        z.object({
          name: z
            .literal('Confidence & Clarity')
            .describe('The category name.'),
          score: z
            .number()
            .describe('The score for this category from 0 to 100.'),
          comment: z
            .string()
            .describe(
              'A detailed comment on the performance in this category.'
            ),
        }),
      ])
    )
    .describe('A list of scores and comments for each category.'),
  strengths: z
    .array(z.string())
    .describe("A list of the candidate's key strengths from the interview."),
  areasForImprovement: z
    .array(z.string())
    .describe('A list of areas where the candidate can improve.'),
  rating: z
    .number()
    .max(5)
    .min(1)
    .describe('A simple rating of the interview on a 1-5 scale.'),
});

export const interviewer: CreateAssistantDTO = {
  name: 'Interviewer',
  firstMessage:
    'Hello, and welcome. Thank you for taking the time to speak with me today. To start, can you please tell me your full name?',
  // firstMessage:
  //   "Hello! Thank you for taking the time to speak with me today. I'm excited to learn more about you and your experience.",
  transcriber: {
    provider: 'deepgram',
    model: 'nova-2',
    language: 'en',
  },
  voice: {
    provider: '11labs',
    voiceId: 'sarah',
    stability: 0.4,
    similarityBoost: 0.8,
    speed: 0.9,
    style: 0.5,
    useSpeakerBoost: true,
  },
  model: {
    provider: 'openai',
    model: 'gpt-4',
    messages: [
      {
        role: 'system',
        content: `You are a professional job interviewer conducting a real-time voice interview with a candidate. Your goal is to assess their qualifications, motivation, and fit for the role.

Interview Guidelines:
Follow the structured question flow:
{{questions}}

Engage naturally & react appropriately:
Listen actively to responses and acknowledge them before moving forward.
Ask brief follow-up questions if a response is vague or requires more detail.
Keep the conversation flowing smoothly while maintaining control.
Be professional, yet warm and welcoming:

Use official yet friendly language.
Keep responses concise and to the point (like in a real voice interview).
Avoid robotic phrasing—sound natural and conversational.
Answer the candidate’s questions professionally:

If asked about the role, company, or expectations, provide a clear and relevant answer.
If unsure, redirect the candidate to HR for more details.

Conclude the interview properly:
Thank the candidate for their time.
Inform them that the company will reach out soon with feedback.
End the conversation on a polite and positive note.


- Be sure to be professional and polite.
- Keep all your responses short and simple. Use official language, but be kind and welcoming.
- This is a voice conversation, so keep your responses short, like in a real conversation. Don't ramble for too long.`,
      },
    ],
  },
};

export const dummyConvo = [
  { role: 'assistant', content: 'Hello, and welcome.' },
  {
    role: 'assistant',
    content: 'Thank you for taking the time to speak with me today.',
  },
  {
    role: 'assistant',
    content: 'To start, can you please tell me your full name?',
  },
  { role: 'user', content: 'Hey.' },
  { role: 'user', content: 'My my name is Ron Cher.' },
  {
    role: 'assistant',
    content: "Nice to meet you, Ron. Let's dive in.",
  },
  { role: 'assistant', content: 'First question,' },
  {
    role: 'assistant',
    content:
      "can you describe your understanding of responsive web design and explain how you'd implement it for a website that needs to work well on both desktop and mobile devices?",
  },
  { role: 'user', content: 'Okay.' },
  { role: 'user', content: 'To create a response, uh, of' },
  { role: 'user', content: "they've app, uh," },
  {
    role: 'assistant',
    content: 'Take your time, Ron. Could you walk me through your',
  },
  { role: 'assistant', content: 'No worries. Take your time. Could' },
  { role: 'user', content: 'Okay. So' },
  { role: 'assistant', content: 'Sure. Go ahead.' },
  { role: 'assistant', content: 'Take your time to explain.' },
  { role: 'user', content: 'Yeah. Okay.' },
  { role: 'user', content: 'So, uh, this sponsor, uh,' },
  { role: 'user', content: 'design needs' },
  { role: 'user', content: 'basically,' },
  { role: 'user', content: 'we can carry, uh, the' },
  {
    role: 'user',
    content: "I'm sure we, uh, responsible in mobile and",
  },
  { role: 'user', content: 'well as in' },
  { role: 'user', content: 'large,' },
  { role: 'user', content: 'large potato shops.' },
  { role: 'user', content: 'And, uh, in CSS, we have already, uh,' },
  { role: 'user', content: 'I mean, we have different breakpoints.' },
  { role: 'user', content: 'To create a responsibility there.' },
  {
    role: 'assistant',
    content: "Got it, Ron. You're emphasizing the importance of break",
  },
  {
    role: 'assistant',
    content: 'points in CSS for ensuring responsiveness across devices.',
  },
  { role: 'assistant', content: 'Could you elaborate?' },
  {
    role: 'assistant',
    content: 'How do you decide on those break points? And are there',
  },
  { role: 'assistant', content: 'design?' },
  { role: 'user', content: 'Okay. So' },
  {
    role: 'user',
    content:
      'uh, to create a response here, a design, uh, first of all, we can use a browser.',
  },
  { role: 'assistant', content: 'Good point, Ron. Browsers' },
  { role: 'user', content: "Yeah. It's" },
  {
    role: 'assistant',
    content: "Thank you, Ron. Let's move to the next question.",
  },
  {
    role: 'assistant',
    content:
      'Can you explain the difference between inline CSS, internal CSS, and external CSS. What are the advantages and disadvantages of each?',
  },
  { role: 'user', content: "I don't know." },
  { role: 'assistant', content: "That's alright, Ron." },
  {
    role: 'assistant',
    content:
      'Let me simplify it for you, and then you can share your thoughts.',
  },
  {
    role: 'assistant',
    content: 'In line CSS is applied directly inside an HTML element',
  },
  {
    role: 'assistant',
    content: 'internal CSS goes in a tag within the of',
  },
  {
    role: 'assistant',
    content: 'the file, and external CSS is linked as a separate dot e s file.',
  },
  {
    role: 'assistant',
    content: 'Why do you think external CSS might be commonly used?',
  },
  { role: 'user', content: "No. I don't think so." },
  {
    role: 'assistant',
    content: "That's okay, Ron. Let's move on to the next question.",
  },
  {
    role: 'assistant',
    content:
      'Can you walk me through your process for debugging a JavaScript issue in a web application?',
  },
  {
    role: 'assistant',
    content: 'What tools or techniques would you use?',
  },
  { role: 'user', content: "I don't know. Uh, maybe we can use, uh," },
  { role: 'user', content: 'browser' },
  { role: 'user', content: 'console.' },
  { role: 'assistant', content: "You're absolutely right, Ron." },
  {
    role: 'assistant',
    content: 'The browser console is a key tool for debugging. Could you',
  },
  {
    role: 'assistant',
    content: "share how you'd use it to identify and solve an issue?",
  },
  {
    role: 'assistant',
    content: 'For instance, would you use console logs or inspect elements?',
  },
  { role: 'user', content: 'I prefer using console log.' },
  { role: 'user', content: 'Yeah.' },
  { role: 'user', content: 'And, uh,' },
  {
    role: 'assistant',
    content: 'Great choice, Ron. Console logs are very',
  },
  { role: 'assistant', content: 'Good choice.' },
  {
    role: 'assistant',
    content: 'Console logs can help track values and pinpoint issues',
  },
  {
    role: 'assistant',
    content:
      'Would you also consider using break points or debugging tools and developer tools?',
  },
  { role: 'user', content: 'Just, uh,' },
  {
    role: 'user',
    content: 'I use our developer tools plus, uh, we have, uh,',
  },
  { role: 'user', content: 'react' },
  { role: 'user', content: 'book.' },
  { role: 'user', content: 'Compiler.' },
  { role: 'user', content: 'Profiler, basically.' },
  {
    role: 'assistant',
    content: "That's a solid approach, Ron. Using developer tools and React",
  },
  {
    role: 'assistant',
    content:
      'Profiler shows a good understanding. Do you typically prefer working with framework',
  },
  { role: 'assistant', content: 'like React for debugging?' },
  { role: 'user', content: 'Yes.' },
  {
    role: 'assistant',
    content: "Got it. That's helpful to know, Ron. Thank you for your answers",
  },
  {
    role: 'assistant',
    content: 'so far. Do you have any questions about the role or the company?',
  },
  { role: 'user', content: 'No.' },
  { role: 'user', content: 'Not fun.' },
  {
    role: 'assistant',
    content: "Alright, Ron. Thank you for your time today. We'll be in touch",
  },
  {
    role: 'assistant',
    content: 'soon with feedback. Have a great day.',
  },
  { role: 'user', content: 'Okay. Thank you.' },
  {
    role: 'assistant',
    content: "You're welcome, Ron. Take care. Goodbye.",
  },
];
