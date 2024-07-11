import { Task, User } from "@/app/types/task";
import { db } from "@/lib/db"

export const getAllUserTasks = async (userEmail: string) => {
    const user = await db.uSERS.findUnique({
        where: {
            email: userEmail
        }
    })
    if (!user) {
        return null
    }
    const userTasks = await db.user_to_tasks.findMany({ where: { user_id: user.id } })
    return userTasks;
}

export const getTaskById = async (id: string) => {
    const task = await db.tasks.findUnique({
        where: {
            id: Number(id),
        }
    })
    return task
}

export const createTask = async (userEmail: string, data: Task) => {
    const newTask = await db.tasks.create({
        data
    })
    const user = await db.uSERS.findUnique({
        where: {
            email: userEmail
        }
    })
    
    if (!user) {
        return null
    }

    const newUserToTask = await db.user_to_tasks.create({
        data: {
            user_id: user.id,
            task_id: newTask.id
        }
    })
    return newTask
}