import { taskFormSchema } from '@/app/types/task';
import { db } from '@/lib/db';
import { Tasks } from '@prisma/client';
import { z } from 'zod';

export const getAllUserTasks = async ({ userId }: { userId: number }) => {
  const userTasks = await db.tasks.findMany({ where: { userId } });
  return userTasks;
};

export const getTaskById = async (id: string) => {
  const task = await db.tasks.findUnique({
    where: {
      id: Number(id),
    },
  });
  return task;
};

export const createTask = async ({ task }: { task: Omit<Tasks, 'id'> }) => {
  const newTask = await db.tasks.create({
    data: {
      name: task.name,
      description: task.description,
      points: Number(task.points),
      userId: task.userId,
    },
  });

  return newTask;
};

export const deleteTask = async ({ taskId }: { taskId: number }) => {
  const task = await db.tasks.delete({
    where: {
      id: taskId,
    },
  });
  return task;
};
