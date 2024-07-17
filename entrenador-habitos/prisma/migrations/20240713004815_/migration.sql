/*
  Warnings:

  - You are about to drop the `task_status` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `status_id` to the `Tasks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterSequence
ALTER SEQUENCE "Rewards_id_seq" MAXVALUE 9223372036854775807;

-- AlterSequence
ALTER SEQUENCE "Task_Status_id_seq" MAXVALUE 9223372036854775807;

-- DropForeignKey
ALTER TABLE "task_status" DROP CONSTRAINT "task_status_status_id_fkey";

-- DropForeignKey
ALTER TABLE "task_status" DROP CONSTRAINT "task_status_task_id_fkey";

-- AlterTable
ALTER TABLE "Tasks" ADD COLUMN     "status_id" INT4 NOT NULL;

-- DropTable
DROP TABLE "task_status";

-- AddForeignKey
ALTER TABLE "Tasks" ADD CONSTRAINT "Tasks_status_id_fkey" FOREIGN KEY ("status_id") REFERENCES "Task_Status"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
