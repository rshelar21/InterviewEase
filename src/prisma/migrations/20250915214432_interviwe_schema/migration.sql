/*
  Warnings:

  - The values [MID] on the enum `DifficultyEnum` will be removed. If these variants are still used in the database, this will fail.
  - Made the column `difficulty` on table `Interview` required. This step will fail if there are existing NULL values in that column.
  - Made the column `interviewType` on table `Interview` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "public"."DifficultyEnum_new" AS ENUM ('ENTRY_LEVEL', 'MID_LEVEL', 'SENIOR', 'PRINCIPAL');
ALTER TABLE "public"."Interview" ALTER COLUMN "difficulty" DROP DEFAULT;
ALTER TABLE "public"."Interview" ALTER COLUMN "difficulty" TYPE "public"."DifficultyEnum_new" USING ("difficulty"::text::"public"."DifficultyEnum_new");
ALTER TYPE "public"."DifficultyEnum" RENAME TO "DifficultyEnum_old";
ALTER TYPE "public"."DifficultyEnum_new" RENAME TO "DifficultyEnum";
DROP TYPE "public"."DifficultyEnum_old";
ALTER TABLE "public"."Interview" ALTER COLUMN "difficulty" SET DEFAULT 'ENTRY_LEVEL';
COMMIT;

-- AlterTable
ALTER TABLE "public"."Interview" ALTER COLUMN "difficulty" SET NOT NULL,
ALTER COLUMN "interviewType" SET NOT NULL;
