-- CreateEnum
CREATE TYPE "public"."DifficultyEnum" AS ENUM ('ENTRY_LEVEL', 'MID', 'SENIOR', 'PRINCIPAL');

-- CreateEnum
CREATE TYPE "public"."InterviewType" AS ENUM ('TECHNICAL', 'BEHAVIORAL', 'SYSTEM_DESIGN', 'CULTURAL_FIT');

-- CreateEnum
CREATE TYPE "public"."InterviewStaus" AS ENUM ('DRAFT', 'IN_PROGRESS', 'COMPLETED');

-- CreateTable
CREATE TABLE "public"."Feedback" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "interviewId" TEXT,

    CONSTRAINT "Feedback_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Interview" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "jobDescription" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "difficulty" "public"."DifficultyEnum" DEFAULT 'ENTRY_LEVEL',
    "interviewType" "public"."InterviewType" DEFAULT 'TECHNICAL',
    "scheduledDate" TIMESTAMP(3),
    "scheduleLater" BOOLEAN NOT NULL,
    "userId" TEXT NOT NULL,
    "status" "public"."InterviewStaus" NOT NULL DEFAULT 'DRAFT',
    "duration" TEXT,
    "rating" INTEGER NOT NULL DEFAULT 0,
    "score" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Interview_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Feedback" ADD CONSTRAINT "Feedback_interviewId_fkey" FOREIGN KEY ("interviewId") REFERENCES "public"."Interview"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Interview" ADD CONSTRAINT "Interview_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
