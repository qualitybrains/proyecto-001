import { authOptions } from '@/lib/authOptions';
import { getServerSession } from 'next-auth/next';
import { NextRequest, NextResponse } from 'next/server';
import { createTask, deleteTask, getAllUserTasks } from '../controllers/tasks';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    // If we don't have a session or user doesn't have email, return unauthorized
    if (!session || !session.user?.email) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const tasks = await getAllUserTasks(session.user.email);

    return NextResponse.json({ data: tasks }, { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Internal Server Error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) {
    return new Response(JSON.stringify({ message: 'Unauthorized' }), {
      status: 401,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
  const data = await request.json();
  const newTask = await createTask(session.user.email, data);
  if (!newTask) {
    return new Response(JSON.stringify({ message: 'Failed to create task' }));
  }
  return new Response(JSON.stringify(newTask), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
