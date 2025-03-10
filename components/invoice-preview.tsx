import type { InvoiceData } from "./invoice-form"
import { TemplateSelector } from "./template-selector"
import { ClassicTemplate } from "./invoice-templates/classic"
import { ModernTemplate } from "./invoice-templates/modern"
import { MinimalTemplate } from "./invoice-templates/minimal"
import { BoldTemplate } from "./invoice-templates/bold"

interface InvoicePreviewProps {
  data: InvoiceData
  template: string
  onSelectTemplate: (templateId: string) => void
}

export function InvoicePreview({ data, template, onSelectTemplate }: InvoicePreviewProps) {
  return (
    <div className="bg-purple-50 p-6 h-full">
      <div className="flex justify-between items-center mb-6">
        <p className="text-gray-600">Need a Different Design?</p>
        <TemplateSelector selectedTemplate={template} onSelectTemplate={onSelectTemplate} />
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {template === "classic" && <ClassicTemplate data={data} />}
        {template === "modern" && <ModernTemplate data={data} />}
        {template === "minimal" && <MinimalTemplate data={data} />}
        {template === "bold" && <BoldTemplate data={data} />}
      </div>
    </div>
  )
}

