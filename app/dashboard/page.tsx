"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { InvoiceForm, type InvoiceData } from "@/components/invoice-form"
import { InvoicePreview } from "@/components/invoice-preview"
import { Button } from "@/components/ui/button"
import { Save } from "lucide-react"

export default function DashboardPage() {
  const router = useRouter()
  const [invoiceData, setInvoiceData] = useState<InvoiceData>({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    projectDescription: "",
    items: [{ name: "Home Page", rate: 5600, quantity: 1 }],
  })
  const [template, setTemplate] = useState("classic")
  const [isSaving, setIsSaving] = useState(false)

  const handleSaveInvoice = async () => {
    try {
      setIsSaving(true)
      const response = await fetch("/api/invoices", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: "someUserId", // Replace with actual user ID from session or context
          clientName: `${invoiceData.firstName} ${invoiceData.lastName}`,
          clientEmail: invoiceData.email,
          address: invoiceData.address,
          items: invoiceData.items,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to save invoice")
      }

      router.push("/manage")
    } catch (error) {
      console.error("Error saving invoice:", error)
      alert("Failed to save invoice. Please try again.")
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <Header variant="dashboard" />
      <div className="grid grid-cols-2 gap-6">
        <div>
          <InvoiceForm onUpdateInvoice={setInvoiceData} template={template} />
          <div className="p-6">
            <Button onClick={handleSaveInvoice} variant="outline" className="w-full" disabled={isSaving}>
              <Save className="mr-2 h-4 w-4" />
              {isSaving ? "Saving..." : "Save Invoice"}
            </Button>
          </div>
        </div>
        <InvoicePreview data={invoiceData} template={template} onSelectTemplate={setTemplate} />
      </div>
    </div>
  )
} 