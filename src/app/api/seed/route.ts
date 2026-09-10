import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ message: "Mock data has been removed. Seed endpoint disabled." });
}
