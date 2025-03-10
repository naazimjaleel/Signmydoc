import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { template, invoiceData } = await req.json();
    
    // Temporary simplified response
    return NextResponse.json({ 
      success: true,
      message: "PDF generation endpoint reached",
      data: { template, invoiceData }
    });
    
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}