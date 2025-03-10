"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { TEMPLATES } from "./invoice-templates"

interface TemplateSelectorProps {
  selectedTemplate: string
  onSelectTemplate: (templateId: string) => void
}

export function TemplateSelector({ selectedTemplate, onSelectTemplate }: TemplateSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleSelect = (templateId: string) => {
    onSelectTemplate(templateId)
    setIsOpen(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="link" className="text-purple-600 hover:underline">
          Choose a Template
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Select Invoice Template</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4 py-4">
          {TEMPLATES.map((template) => (
            <div
              key={template.id}
              className={`border rounded-lg p-2 cursor-pointer transition-all ${
                selectedTemplate === template.id ? "border-purple-600 bg-purple-50" : "hover:border-gray-400"
              }`}
              onClick={() => handleSelect(template.id)}
            >
              <div className="aspect-video bg-gray-100 rounded mb-2 overflow-hidden">
                <div className="w-full h-full flex items-center justify-center text-gray-400">{template.name}</div>
              </div>
              <h3 className="font-medium">{template.name}</h3>
              <p className="text-sm text-gray-500">{template.description}</p>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}

