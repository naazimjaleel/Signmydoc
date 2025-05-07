import { NextResponse } from 'next/server';
import { ModernTemplate } from '@/components/templates/modern-template';

export async function POST(req: Request) {
  try {
    const { template, invoiceData } = await req.json();
    let renderedTemplate = '';

    switch (template) {
      case "modern":
        // Return the template data directly
        return NextResponse.json({ 
          template: 'modern',
          data: invoiceData 
        });
      case "minimal":
        // Add similar handling for minimal template if needed
        return NextResponse.json({ 
          template: 'minimal',
          data: invoiceData 
        });
      default:
        return NextResponse.json(
          { error: 'Invalid template' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Error generating PDF:', error);
    return NextResponse.json(
      { error: 'Failed to generate PDF' },
      { status: 500 }
    );
  }
}