/*
  Warnings:

  - You are about to drop the column `user_id` on the `Tasks` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Tasks` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Tasks" DROP CONSTRAINT "Tasks_user_id_fkey";

-- AlterTable
ALTER TABLE "Tasks" DROP COLUMN "user_id";
ALTER TABLE "Tasks" ADD COLUMN     "userId" INT4 NOT NULL;

-- AddForeignKey
ALTER TABLE "Tasks" ADD CONSTRAINT "Tasks_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
