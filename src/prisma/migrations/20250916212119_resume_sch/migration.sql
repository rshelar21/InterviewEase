/*
  Warnings:

  - Made the column `name` on table `Reusme` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."Reusme" ALTER COLUMN "name" SET NOT NULL;
