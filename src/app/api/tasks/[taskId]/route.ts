import { authOptions } from '@/lib/authOptions';
import { getServerSession } from 'next-auth/next';
import { NextRequest, NextResponse } from 'next/server';
import { deleteTask } from '../../controllers/tasks';

export async function DELETE(request: NextRequest, { params }: { params: { taskId: string } }) {
  try {
    const session = await getServerSession(authOptions);
    // If we don't have a session or user doesn't have email, return unauthorized
    if (!session || !session.user?.email) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

    const { taskId } = params;
    const task = await deleteTask(taskId);
    return NextResponse.json({ data: task }, { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Internal Server Error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
