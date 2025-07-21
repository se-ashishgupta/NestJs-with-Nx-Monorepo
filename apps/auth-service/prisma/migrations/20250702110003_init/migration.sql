/*
  Warnings:

  - You are about to drop the `userDetails` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "userDetails" DROP CONSTRAINT "userDetails_userId_fkey";

-- DropTable
DROP TABLE "userDetails";

-- CreateTable
CREATE TABLE "user_details" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "firstName" VARCHAR(50),
    "lastName" VARCHAR(50),
    "company" VARCHAR(100),
    "level" VARCHAR(50),
    "avatarUrl" VARCHAR(255),
    "bio" TEXT,
    "location" VARCHAR(100),
    "timezone" VARCHAR(50),
    "preferences" JSONB,
    "githubUrl" VARCHAR(255),
    "linkedinUrl" VARCHAR(255),
    "twitterUrl" VARCHAR(255),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_details_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_details_userId_key" ON "user_details"("userId");

-- CreateIndex
CREATE INDEX "user_details_userId_idx" ON "user_details"("userId");

-- CreateIndex
CREATE INDEX "user_details_company_level_idx" ON "user_details"("company", "level");

-- AddForeignKey
ALTER TABLE "user_details" ADD CONSTRAINT "user_details_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
