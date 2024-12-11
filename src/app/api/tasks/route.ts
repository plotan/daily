import { NextResponse } from 'next/server';
import { taskDb } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const task = await taskDb.create({
      title: body.title,
      date: new Date(body.date).toISOString(),
    });
    return NextResponse.json(task);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create task' },
      { status: 500 }
    );
  }
}