-- CreateEnum
CREATE TYPE "OrganizationType" AS ENUM ('COMPANY', 'NON_PROFIT', 'GOVERNMENT');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN', 'MODERATOR', 'ORG_HEAD', 'EMPLOYEE');

-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('FREE', 'PRO', 'ENTERPRISE');

-- CreateTable
CREATE TABLE "organizations" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "websiteUrl" VARCHAR(255),
    "description" TEXT,
    "email" VARCHAR(255),
    "address" VARCHAR(255),
    "phone" VARCHAR(20),
    "type" "OrganizationType" NOT NULL DEFAULT 'COMPANY',
    "totalTokens" INTEGER NOT NULL DEFAULT 0,
    "usedTokens" INTEGER NOT NULL DEFAULT 0,
    "availableTokens" INTEGER NOT NULL DEFAULT 0,
    "lastUpdated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "maxUsers" INTEGER NOT NULL DEFAULT 1,
    "currentUsers" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "organizations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "userName" VARCHAR(50) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "passwordHash" VARCHAR(255) NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "emailVerified" BOOLEAN NOT NULL DEFAULT false,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "type" "UserType" NOT NULL DEFAULT 'FREE',
    "totalTokens" INTEGER NOT NULL DEFAULT 0,
    "usedTokens" INTEGER NOT NULL DEFAULT 0,
    "availableTokens" INTEGER NOT NULL DEFAULT 0,
    "lastTokenReset" TIMESTAMP(3),
    "organizationId" TEXT,
    "failedLoginAttempts" INTEGER NOT NULL DEFAULT 0,
    "lastFailedLogin" TIMESTAMP(3),
    "isLocked" BOOLEAN NOT NULL DEFAULT false,
    "lockUntil" TIMESTAMP(3),
    "passwordResetToken" VARCHAR(255),
    "passwordResetExpires" TIMESTAMP(3),
    "lastLoginAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "userDetails" (
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

    CONSTRAINT "userDetails_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "organizations_email_name_idx" ON "organizations"("email", "name");

-- CreateIndex
CREATE INDEX "organizations_type_isActive_idx" ON "organizations"("type", "isActive");

-- CreateIndex
CREATE INDEX "organizations_currentUsers_idx" ON "organizations"("currentUsers");

-- CreateIndex
CREATE UNIQUE INDEX "users_userName_key" ON "users"("userName");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "users_email_userName_idx" ON "users"("email", "userName");

-- CreateIndex
CREATE INDEX "users_isActive_emailVerified_idx" ON "users"("isActive", "emailVerified");

-- CreateIndex
CREATE INDEX "users_lastLoginAt_idx" ON "users"("lastLoginAt");

-- CreateIndex
CREATE UNIQUE INDEX "userDetails_userId_key" ON "userDetails"("userId");

-- CreateIndex
CREATE INDEX "userDetails_userId_idx" ON "userDetails"("userId");

-- CreateIndex
CREATE INDEX "userDetails_company_level_idx" ON "userDetails"("company", "level");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organizations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userDetails" ADD CONSTRAINT "userDetails_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
