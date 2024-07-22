import { taskFormSchema } from '@/app/types/task';
import { db } from '@/lib/db';
import { z } from 'zod';

export const getAllUserTasks = async (userEmail: string) => {
  const user = await db.uSERS.findUnique({
    where: {
      email: userEmail,
    },
  });
  if (!user) {
    return null;
  }
  const userTasks = await db.user_to_tasks.findMany({ select: { task: true }, where: { user_id: user.id } });
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

export const createTask = async (userEmail: string, data: z.infer<typeof taskFormSchema>) => {
  const newTask = await db.tasks.create({
    data: {
      name: data.name,
      description: data.description,
      points: Number(data.points),
      status_id: 1,
    },
  });
  const user = await db.uSERS.findUnique({
    where: {
      email: userEmail,
    },
  });

  if (!user) {
    return null;
  }

  const newUserToTask = await db.user_to_tasks.create({
    data: {
      user_id: user.id,
      task_id: newTask.id,
    },
  });
  return newUserToTask;
};

export const deleteTask = async (id: string) => {
  const task = await db.tasks.delete({
    where: {
      id: Number(id),
    },
  });
  return task;
};
