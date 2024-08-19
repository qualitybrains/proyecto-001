import { authOptions } from '@/lib/authOptions';
import { db } from '@/lib/db';
import { Tasks } from '@prisma/client';
import { getServerSession } from 'next-auth/next';
import { NextRequest, NextResponse } from 'next/server';
import { createTask, deleteTask, getAllUserTasks } from '../../controllers/tasks';

export async function POST(request: NextRequest) {
    try {
      const session = await getServerSession(authOptions);
      if (!session || !session.user?.email) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  
      const requestJson = await request.json();
      const user = await db.users.findUnique({
        where: {
          email: session.user.email,
        },
      });
      if (!user) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
      const completeTask = await createTask({ task: requestJson.taskId });
      if (!completeTask) return NextResponse.json({ message: 'Unable to complete task' }, { status: 400 });
      return NextResponse.json({ completeTask }, { status: 200 });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Internal Server Error';
      return NextResponse.json({ error: message }, { status: 500 });
    }
  }