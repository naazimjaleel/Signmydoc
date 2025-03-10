import { NextResponse } from 'next/server';
import { renderToString } from 'react-dom/server';
import ModernTemplate from '@/components/templates/ModernTemplate'; // Ensure this path is correct

export async function POST(req: Request) {
  try {
    const { template, invoiceData } = await req.json();
    let renderedTemplate = '';

    switch (template) {
      case "modern":
        renderedTemplate = renderToString(
          <ModernTemplate invoiceData={invoiceData} />
        );
        break;
      case "minimal":
        // Add similar rendering for minimal template if needed
        break;
      default:
        // Handle default case
        break;
    }

    return NextResponse.json({ html: renderedTemplate });
  } catch (error) {
    console.error('Error generating PDF:', error);
    return NextResponse.json(
      { error: 'Failed to generate PDF' },
      { status: 500 }
    );
  }
}