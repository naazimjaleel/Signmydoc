import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    return NextResponse.json({ 
      success: true,
      message: "Email endpoint reached",
      data
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to process email' },
      { status: 500 }
    );
  }
}