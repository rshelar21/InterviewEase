-- CreateTable
CREATE TABLE "public"."Reusme" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "resumeUrl" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "content" JSONB NOT NULL,

    CONSTRAINT "Reusme_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Reusme_userId_key" ON "public"."Reusme"("userId");

-- AddForeignKey
ALTER TABLE "public"."Reusme" ADD CONSTRAINT "Reusme_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
