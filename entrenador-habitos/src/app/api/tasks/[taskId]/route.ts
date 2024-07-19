import { getServerSession } from "next-auth/next";
import { deleteTask } from "../../controllers/tasks";
import { authOptions } from "@/lib/authOptions";
import { NextResponse, NextRequest } from "next/server";

export async function DELETE(request: NextRequest, { params }: { params: { taskId: string } }) {
    const session = await getServerSession(authOptions);
    // If we don't have a session or user doesn't have email, return unauthorized
    if (!session || !session.user?.email) {
        return new NextResponse(JSON.stringify({ message: "Unauthorized" }), {
            status: 401,
            headers: {
                "Content-Type": "application/json",
            },
        });
    }

    const { taskId } = params;
    const task = await deleteTask(taskId);
    return new NextResponse(JSON.stringify(task), {
        status: 200,
        headers: {
            "Content-Type": "application/json",
        },
    });
}