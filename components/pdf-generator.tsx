'use client';

import { ModernTemplate } from './templates/modern-template';
import React from 'react';

interface PDFGeneratorProps {
  template: string;
  data: any;
}

export function PDFGenerator({ template, data }: PDFGeneratorProps) {
  const renderTemplate = () => {
    switch (template) {
      case 'modern':
        return <ModernTemplate invoiceData={data} />;
      case 'minimal':
        // Add minimal template rendering
        return null;
      default:
        return null;
    }
  };

  return (
    <div className="pdf-container">
      {renderTemplate()}
    </div>
  );
} 