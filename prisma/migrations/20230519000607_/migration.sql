/*
  Warnings:

  - A unique constraint covering the columns `[user_id]` on the table `EmailVerificationCode` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "is_email_verified" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE UNIQUE INDEX "user_id" ON "EmailVerificationCode"("user_id");
