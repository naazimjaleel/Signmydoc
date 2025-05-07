import { NextResponse } from 'next/server';
import { renderToString } from 'react-dom/server';
import React from 'react';
import { ModernTemplate } from '@/components/templates/modern-template';

export async function POST(req: Request) {
  try {
    const { template, invoiceData } = await req.json();
    let renderedTemplate = '';

    switch (template) {
      case "modern":
        renderedTemplate = renderToString(
          React.createElement(ModernTemplate, { invoiceData })
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