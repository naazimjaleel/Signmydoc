import { NextResponse } from 'next/server';
import { renderToString } from 'react-dom/server';

export async function POST(req: Request) {
  try {
    const { template, invoiceData } = await req.json();
    let renderedTemplate = '';

    // Simplified template rendering for now
    renderedTemplate = `<div>${JSON.stringify(invoiceData)}</div>`;

    return NextResponse.json({ html: renderedTemplate });
  } catch (error) {
    console.error('Error generating PDF:', error);
    return NextResponse.json(
      { error: 'Failed to generate PDF' },
      { status: 500 }
    );
  }
}