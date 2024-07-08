import { Task } from "@/app/types/task";
import { db } from "@/lib/db"

export const getAllTasks = async () => {
    const allTasks = await db.tasks.findMany({})
    return allTasks;
}

export const getTaskById = async (id: string) => {
    const task = await db.tasks.findUnique({
        where: {
            id: Number(id),
        }
    })
    return task
}

export const createTask = async (data: Task) => {
    const newTask = await db.tasks.create({
        data
    })
    return newTask
}