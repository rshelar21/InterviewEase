/*
  Warnings:

  - Added the required column `questions` to the `Interview` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Interview" ADD COLUMN     "questions" JSONB NOT NULL;
