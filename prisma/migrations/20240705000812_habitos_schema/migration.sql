-- AlterTable
ALTER TABLE "USERS" ADD COLUMN     "points" INT4 NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "Tasks" (
    "id" INT4 NOT NULL GENERATED BY DEFAULT AS IDENTITY,
    "name" STRING NOT NULL,
    "description" STRING,
    "points" INT4 NOT NULL,

    CONSTRAINT "Tasks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Rewards" (
    "id" INT4 NOT NULL GENERATED BY DEFAULT AS IDENTITY,
    "name" STRING NOT NULL,
    "description" STRING,
    "cost" INT4 NOT NULL,

    CONSTRAINT "Rewards_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Achievements" (
    "id" INT4 NOT NULL GENERATED BY DEFAULT AS IDENTITY,
    "name" STRING NOT NULL,
    "description" STRING,

    CONSTRAINT "Achievements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Task_Status" (
    "id" INT4 NOT NULL GENERATED BY DEFAULT AS IDENTITY,
    "status" STRING NOT NULL,

    CONSTRAINT "Task_Status_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_to_tasks" (
    "user_id" INT4 NOT NULL,
    "task_id" INT4 NOT NULL,

    CONSTRAINT "user_to_tasks_pkey" PRIMARY KEY ("user_id","task_id")
);

-- CreateTable
CREATE TABLE "user_to_rewards" (
    "user_id" INT4 NOT NULL,
    "reward_id" INT4 NOT NULL,

    CONSTRAINT "user_to_rewards_pkey" PRIMARY KEY ("user_id","reward_id")
);

-- CreateTable
CREATE TABLE "task_status" (
    "task_id" INT4 NOT NULL,
    "status_id" INT4 NOT NULL,

    CONSTRAINT "task_status_pkey" PRIMARY KEY ("task_id","status_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Tasks_name_key" ON "Tasks"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Rewards_name_key" ON "Rewards"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Achievements_name_key" ON "Achievements"("name");

-- AddForeignKey
ALTER TABLE "user_to_tasks" ADD CONSTRAINT "user_to_tasks_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "USERS"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_to_tasks" ADD CONSTRAINT "user_to_tasks_task_id_fkey" FOREIGN KEY ("task_id") REFERENCES "Tasks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_to_rewards" ADD CONSTRAINT "user_to_rewards_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "USERS"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_to_rewards" ADD CONSTRAINT "user_to_rewards_reward_id_fkey" FOREIGN KEY ("reward_id") REFERENCES "Rewards"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "task_status" ADD CONSTRAINT "task_status_task_id_fkey" FOREIGN KEY ("task_id") REFERENCES "Tasks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "task_status" ADD CONSTRAINT "task_status_status_id_fkey" FOREIGN KEY ("status_id") REFERENCES "Task_Status"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
