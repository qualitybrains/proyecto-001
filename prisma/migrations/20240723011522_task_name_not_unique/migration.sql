/*
  Warnings:

  - Made the column `description` on table `Tasks` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "Tasks_name_key";

-- AlterTable
ALTER TABLE "Tasks" ALTER COLUMN "description" SET NOT NULL;
