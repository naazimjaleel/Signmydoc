import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    return NextResponse.json({ 
      success: true,
      message: "Invoice created",
      data
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create invoice' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ 
    success: true,
    message: "Invoices retrieved",
    data: []
  });
}