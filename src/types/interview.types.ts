export type InterviewStatus =
  | 'DRAFT'
  | 'IN_PROGRESS'
  | 'COMPLETED'
  | 'SCHEDULED';

export type DifficultyEnum =
  | 'ENTRY_LEVEL'
  | 'MID_LEVEL'
  | 'SENIOR'
  | 'PRINCIPAL';

export type InterviewType =
  | 'TECHNICAL'
  | 'BEHAVIORAL'
  | 'SYSTEM_DESIGN'
  | 'CULTURAL_FIT';

export enum CallStatus {
  INACTIVE = 'INACTIVE',
  CONNECTING = 'CONNECTING',
  ACTIVE = 'ACTIVE',
  FINISHED = 'FINISHED',
}

export interface CreateInterviewType {
  title: string;
  companyName: string;
  jobDescription: string;
  description: string;
  scheduledDate?: string | null;
  status?: InterviewStatus; // optional, backend can default to DRAFT
  difficulty: DifficultyEnum;
  interviewType: InterviewType;
  scheduleLater: boolean;
  duration?: string | null;
}

export interface Interview {
  id: string;
  title: string;
  companyName: string;
  jobDescription: string;
  description: string;
  difficulty: DifficultyEnum;
  interviewType: InterviewType;
  scheduledDate?: Date | null;
  scheduleLater: boolean;
  userId: string;
  status: InterviewStatus;
  duration?: string | null;
  rating: number;
  score: number;
  createdAt: Date;
  updatedAt: Date;
  feedback?: Feedback[]; // You'll need to define Feedback interface too
  questions?: string[];
}

export interface CategoryScore {
  id: string;
  comment: string;
  score: number;
  name: string;
  feedbackId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Feedback {
  id: string;
  interviewId: string;
  improvements: string[];
  strengths: number[];
  categoryScores: CategoryScore[];
  createdAt: Date;
  updatedAt: Date;
}
