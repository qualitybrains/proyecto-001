/*
  Warnings:

  - You are about to drop the column `full_name` on the `Users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Users" DROP COLUMN "full_name";
ALTER TABLE "Users" ADD COLUMN     "fullName" STRING;
