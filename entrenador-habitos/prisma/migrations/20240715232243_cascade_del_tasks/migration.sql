-- DropForeignKey
ALTER TABLE "Tasks" DROP CONSTRAINT "Tasks_status_id_fkey";

-- AddForeignKey
ALTER TABLE "Tasks" ADD CONSTRAINT "Tasks_status_id_fkey" FOREIGN KEY ("status_id") REFERENCES "Task_Status"("id") ON DELETE CASCADE ON UPDATE CASCADE;
