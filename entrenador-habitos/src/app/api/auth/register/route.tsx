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

    if (userFound) {
      return NextResponse.json(
        {
          message: 'Email already exists',
        },
        {
          status: 400,
        },
      );
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const newUser = await db.uSERS.create({
      data: {
        full_name: data.fullName,
        email: data.email,
        password: hashedPassword,
      },
    });

    const { password: _, ...user } = newUser;

    return NextResponse.json(user);
  } catch {
    return NextResponse.json(
      {
        message: 'Internal Server Error',
      },
      {
        status: 500,
      },
    );
  }
}
