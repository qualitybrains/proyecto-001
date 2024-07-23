/*
  Warnings:

  - You are about to drop the column `status_id` on the `Tasks` table. All the data in the column will be lost.
  - You are about to drop the `Task_Status` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `USERS` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_to_rewards` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_to_tasks` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `user_id` to the `Tasks` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Tasks" DROP CONSTRAINT "Tasks_status_id_fkey";

-- DropForeignKey
ALTER TABLE "user_to_rewards" DROP CONSTRAINT "user_to_rewards_reward_id_fkey";

-- DropForeignKey
ALTER TABLE "user_to_rewards" DROP CONSTRAINT "user_to_rewards_user_id_fkey";

-- DropForeignKey
ALTER TABLE "user_to_tasks" DROP CONSTRAINT "user_to_tasks_task_id_fkey";

-- DropForeignKey
ALTER TABLE "user_to_tasks" DROP CONSTRAINT "user_to_tasks_user_id_fkey";

-- AlterTable
ALTER TABLE "Tasks" DROP COLUMN "status_id";
ALTER TABLE "Tasks" ADD COLUMN     "isPublic" BOOL NOT NULL DEFAULT false;
ALTER TABLE "Tasks" ADD COLUMN     "user_id" INT4 NOT NULL;

-- DropTable
DROP TABLE "Task_Status";

-- DropTable
DROP TABLE "USERS";

-- DropTable
DROP TABLE "user_to_rewards";

-- DropTable
DROP TABLE "user_to_tasks";

-- CreateTable
CREATE TABLE "Users" (
    "id" INT4 NOT NULL GENERATED BY DEFAULT AS IDENTITY,
    "email" STRING NOT NULL,
    "full_name" STRING,
    "password" STRING NOT NULL,
    "points" INT4 NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- AddForeignKey
ALTER TABLE "Tasks" ADD CONSTRAINT "Tasks_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;