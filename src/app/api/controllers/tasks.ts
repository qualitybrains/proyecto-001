'use server';

import { db } from '@/lib/db';
import { Tasks } from '@prisma/client';

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

export const completeTask = async ({ taskId }: { taskId: number }) => {
  const user = await db.users.findUnique({
    where: {
      id: 1
    }
  })

  const task_points = await db.tasks.findUnique({
    where: {
      id: taskId
    },
    select: {
      points: true
    }
  })
  
  const task = await db.tasks.update({
    where: {
      id: taskId,
    },
    // TODO: Add actual completion logic
    data: {
      description: "Task completed",
    },
  });

  if(user && task && user.points && task_points?.points)
  {
    await db.users.update({
      where: {
        id: user.id
      },
      data: {
        points: user.points + task_points.points
      }
    })
  }
  return task;
}

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
