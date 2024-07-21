import { getServerSession } from "next-auth/next";
import { createTask, deleteTask, getAllUserTasks } from "../controllers/tasks";
import { authOptions } from "@/lib/authOptions";

export async function GET() {
    const session = await getServerSession(authOptions);
    // If we don't have a session or user doesn't have email, return unauthorized
    if (!session || !session.user?.email) {
        return new Response(JSON.stringify({ message: "Unauthorized" }), {
            status: 401,
            headers: {
                "Content-Type": "application/json",
            },
        });
    }
    const tasks = await getAllUserTasks(session.user.email);
    return new Response(JSON.stringify(tasks), {
        status: 200,
        headers: {
            "Content-Type": "application/json",
        },
    });
}

export async function POST(request: Request) {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
        return new Response(JSON.stringify({ message: "Unauthorized" }), {
            status: 401,
            headers: {
                "Content-Type": "application/json",
            },
        });
    }
    const data = await request.json();
    const newTask = await createTask(session.user.email, data);
    if (!newTask) {
        return new Response(JSON.stringify({ message: "Failed to create task" }))
    }
    return new Response(JSON.stringify(newTask), {
        status: 200,
        headers: {
            "Content-Type": "application/json",
        },
    });
}

export async function DELETE(request: Request) {
    const session = await getServerSession(authOptions);
    // If we don't have a session or user doesn't have email, return unauthorized
    if (!session || !session.user?.email) {
        return new Response(JSON.stringify({ message: "Unauthorized" }), {
            status: 401,
            headers: {
                "Content-Type": "application/json",
            },
        });
    }

    const data = await request.json();
    if (!data || !data.taskId) {
        return new Response(JSON.stringify({ message: "Invalid data" }), {
            status: 400,
            headers: {
                "Content-Type": "application/json",
            },
        });
    }
    const task = await deleteTask(Number(data.taskId));
    return new Response(JSON.stringify("task " + task.name + " deleted successfully"), {
        status: 200,
        headers: {
            "Content-Type": "application/json",
        },
    });
}