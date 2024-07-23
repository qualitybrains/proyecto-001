import { authOptions } from '@/lib/authOptions';
import { db } from '@/lib/db';
import { Tasks } from '@prisma/client';
import { getServerSession } from 'next-auth/next';
import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';
import { createTask, deleteTask, getAllUserTasks } from '../controllers/tasks';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    // If we don't have a session or user doesn't have email, return unauthorized
    if (!session || !session.user?.email) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const user = await db.users.findUnique({
      where: {
        email: session.user.email,
      },
    });

    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const tasks = await getAllUserTasks({ userId: user.id });

    return NextResponse.json({ data: tasks }, { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Internal Server Error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

    const { name, description, points, isPublic }: Omit<Tasks, 'id' | 'user_id'> = await request.json();
    const user = await db.users.findUnique({
      where: {
        email: session.user.email,
      },
    });
    if (!user) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    const data = { name, description, points, isPublic, userId: user.id };
    const newTask = await createTask({ task: data });
    if (!newTask) return NextResponse.json({ message: 'Failed to create task' }, { status: 400 });
    return NextResponse.json({ newTask }, { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Internal Server Error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    // If we don't have a session or user doesn't have email, return unauthorized
    if (!session || !session.user?.email) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

    const { taskId }: { taskId: number } = await request.json();
    if (!taskId) return NextResponse.json({ message: 'Invalid Data' }, { status: 400 });

    const task = await deleteTask({ taskId: Number(taskId) });
    return NextResponse.json({ data: task }, { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Internal Server Error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
