import { db } from '@/lib/db';
import { Users } from '@prisma/client';
import bcrypt from 'bcrypt';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { fullName, email, password }: Omit<Users, 'id' | 'created_at' | 'updated_at'> = await request.json();

    const userExist = await db.users.findUnique({
      where: {
        email: email,
      },
    });

    if (userExist) return NextResponse.json({ error: 'Email already exists' }, { status: 400 });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await db.users.create({
      data: {
        fullName: fullName,
        email: email,
        password: hashedPassword,
      },
    });

    const { password: _, ...user } = newUser;

    return NextResponse.json({ data: user, message: 'User created successfully' });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Internal Server Error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
