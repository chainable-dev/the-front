import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';

export async function GET() {
  try {
    await dbConnect();
    return NextResponse.json({ message: 'Database connected successfully' }, { status: 200 });
  } catch (error) {
    console.error('Database connection failed:', error);
    return NextResponse.json({ error: 'Database connection failed' }, { status: 500 });
  }
}