import { db } from '@/lib/db';
import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const userFound = await db.uSERS.findUnique({
      where: {
        email: data.email,
      },
    });

    if (userFound) return NextResponse.json({ error: 'Email already exists' }, { status: 400 });

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const newUser = await db.uSERS.create({
      data: {
        full_name: data.fullName,
        email: data.email,
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
