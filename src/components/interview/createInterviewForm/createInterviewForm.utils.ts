import * as z from 'zod';
import { Briefcase, FileText, Clock } from 'lucide-react';

export const FORM_FIRST_FORM_SCHEMA = z.object({
  title: z.string().min(2, 'Title is Required'),
  companyName: z.string().min(2, 'Company name is Required'),
  jobDescription: z
    .string()
    .min(10, 'Job description must be at least 10 characters'),
});

export const FORM_SECOND_FORM_SCHEMA = z.object({
  description: z.string().min(5, 'Description must be at least 5 characters'),
  difficulty: z.string().optional(),
  interviewType: z.string().optional(),
});

export const FORM_THIRD_FORM_SCHEMA = z.object({
  scheduledDate: z.date().optional(),
  scheduleLater: z.boolean().optional().default(false),
  status: z.string().optional(),
});

export const FORM_COMBINED_SCHEMA = z.object({
  ...FORM_FIRST_FORM_SCHEMA.shape,
  ...FORM_SECOND_FORM_SCHEMA.shape,
  ...FORM_THIRD_FORM_SCHEMA.shape,
});

export type FormSchemaType = z.infer<typeof FORM_COMBINED_SCHEMA>;

export const FORM_STEPS = [
  { number: 1, title: 'Basic Info', icon: Briefcase },
  { number: 2, title: 'Details', icon: FileText },
  { number: 3, title: 'Schedule', icon: Clock },
];

export const MAX_FORM_STEPS = 3;
