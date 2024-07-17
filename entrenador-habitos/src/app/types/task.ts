export type Task = {
    id: number
    name: string
    description?: string
    points: number
}

export type TaskArray = {
    task: Task
}

export type User = {
    id: number
    email: string
    full_name: string
    password: string
    points: number
}