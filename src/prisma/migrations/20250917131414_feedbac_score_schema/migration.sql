/*
  Warnings:

  - You are about to drop the column `description` on the `Feedback` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Feedback` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[interviewId]` on the table `Feedback` will be added. If there are existing duplicate values, this will fail.
  - Made the column `interviewId` on table `Feedback` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "public"."Feedback" DROP CONSTRAINT "Feedback_interviewId_fkey";

-- AlterTable
ALTER TABLE "public"."Feedback" DROP COLUMN "description",
DROP COLUMN "title",
ADD COLUMN     "improvements" TEXT[],
ADD COLUMN     "strengths" TEXT[],
ALTER COLUMN "interviewId" SET NOT NULL;

-- CreateTable
CREATE TABLE "public"."CategoryScore" (
    "id" TEXT NOT NULL,
    "comment" TEXT NOT NULL,
    "score" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "feedbackId" TEXT NOT NULL,

    CONSTRAINT "CategoryScore_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Feedback_interviewId_key" ON "public"."Feedback"("interviewId");

-- AddForeignKey
ALTER TABLE "public"."CategoryScore" ADD CONSTRAINT "CategoryScore_feedbackId_fkey" FOREIGN KEY ("feedbackId") REFERENCES "public"."Feedback"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Feedback" ADD CONSTRAINT "Feedback_interviewId_fkey" FOREIGN KEY ("interviewId") REFERENCES "public"."Interview"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
