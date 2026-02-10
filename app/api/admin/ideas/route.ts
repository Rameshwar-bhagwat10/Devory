import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ ideas: [] });
}

export async function POST() {
  return NextResponse.json({ message: 'Admin idea action' });
}
