"use client"

import { useState, useMemo } from "react"
import { MapPin, Plus, Send, Minus, Download, Package, DollarSign, Hash, Check, ChevronsUpDown, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { LoadScript, Autocomplete } from "@react-google-maps/api"
import { usePlacesWidget } from "react-google-autocomplete"
import { suggestInvoiceItems } from "@/lib/ai-suggestions"
import { AddressInput } from "@/components/address-input"

export type InvoiceData = {
  firstName: string
  lastName: string
  email: string
  address: string
  projectDescription: string
  items: Array<{
    name: string
    rate: number
    quantity: number
  }>
}

interface InvoiceFormProps {
  onUpdateInvoice: (data: InvoiceData) => void
  template: string
}

interface InvoiceItem {
  id: string
  description: string
  quantity: number
  price: number
  total: number
}

export function InvoiceForm({ onUpdateInvoice, template }: InvoiceFormProps) {
  const [invoiceData, setInvoiceData] = useState<InvoiceData>({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    projectDescription: "",
    items: [{ name: "Home Page", rate: 5600, quantity: 1 }],
  })
  const [isEmailDialogOpen, setIsEmailDialogOpen] = useState(false)
  const [emailTo, setEmailTo] = useState("")
  const [emailSubject, setEmailSubject] = useState("Your Invoice")
  const [emailMessage, setEmailMessage] = useState("Please find attached your invoice.")
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false)
  const [isSendingEmail, setIsSendingEmail] = useState(false)
  const [items, setItems] = useState<InvoiceItem[]>([])
  const [currency, setCurrency] = useState("₹")
  const [open, setOpen] = useState(false)
  const [address, setAddress] = useState("")
  const [addressSuggestions, setAddressSuggestions] = useState([])
  const [projectDescription, setProjectDescription] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)

  const { ref: addressInputRef } = usePlacesWidget({
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    onPlaceSelected: (place) => {
      if (place.formatted_address) {
        updateField("address", place.formatted_address)
      }
    },
    options: {
      types: ["address"],
      componentRestrictions: { country: "in" }, // Change country code as needed
    }
  })

  const updateField = (field: keyof InvoiceData, value: string) => {
    const newData = { ...invoiceData, [field]: value }
    setInvoiceData(newData)
    onUpdateInvoice(newData)
  }

  const addItem = () => {
    const newData = {
      ...invoiceData,
      items: [...invoiceData.items, { name: "New Item", rate: 0, quantity: 1 }],
    }
    setInvoiceData(newData)
    onUpdateInvoice(newData)
  }

  const removeItem = (index: number) => {
    const newData = {
      ...invoiceData,
      items: invoiceData.items.filter((_, i) => i !== index),
    }
    setInvoiceData(newData)
    onUpdateInvoice(newData)
  }

  const updateItem = (index: number, field: 'name' | 'rate' | 'quantity', value: string | number) => {
    const newItems = invoiceData.items.map((item, i) => {
      if (i === index) {
        return { ...item, [field]: value }
      }
      return item
    })

    const newData = { ...invoiceData, items: newItems }
    setInvoiceData(newData)
    onUpdateInvoice(newData)
  }

  const handleDownloadPdf = async () => {
    try {
      setIsGeneratingPdf(true)
      const response = await fetch("/api/generate-pdf", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ invoiceData, template }),
      })

      if (!response.ok) {
        throw new Error("Failed to generate PDF")
      }

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = "invoice.pdf"
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (error) {
      console.error("Error downloading PDF:", error)
    } finally {
      setIsGeneratingPdf(false)
    }
  }

  const handleSendEmail = async () => {
    try {
      setIsSendingEmail(true)
      
      // Validate email fields
      if (!emailTo.trim()) {
        throw new Error('Please enter recipient email address')
      }
      if (!emailTo.includes('@')) {
        throw new Error('Please enter a valid email address')
      }
      if (!emailSubject.trim()) {
        throw new Error('Please enter email subject')
      }

      console.log('Sending email to:', emailTo) // Debug log

      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          invoiceData,
          template,
          to: emailTo,
          subject: emailSubject,
          message: emailMessage,
        }),
      })

      const data = await response.json()
      console.log('Email API response:', data) // Debug log

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send email')
      }

      setIsEmailDialogOpen(false)
      alert('Email sent successfully!')
    } catch (error) {
      console.error('Error sending email:', error)
      alert(error instanceof Error ? error.message : 'Failed to send email. Please try again.')
    } finally {
      setIsSendingEmail(false)
    }
  }

  const handleItemChange = (id: string, field: keyof InvoiceItem, value: any) => {
    setItems(prevItems => 
      prevItems.map(item => {
        if (item.id === id) {
          const updatedItem = { ...item, [field]: value };
          // Recalculate total if quantity or price changes
          if (field === 'quantity' || field === 'price') {
            updatedItem.total = updatedItem.quantity * updatedItem.price;
          }
          return updatedItem;
        }
        return item;
      })
    );
  };

  const handleAddressSelect = (currentValue: string) => {
    setAddress(currentValue)
    setOpen(false)
    updateField("address", currentValue)
  }

  const handleAddressSearch = async (search: string) => {
    if (!search) {
      setAddressSuggestions([])
      return
    }

    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
          search
        )}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&types=address`
      )
      const data = await response.json()
      setAddressSuggestions(data.predictions)
    } catch (error) {
      console.error("Error fetching address suggestions:", error)
    }
  }

  const handleAutoGenerate = async () => {
    if (!projectDescription) return
    
    setIsGenerating(true)
    try {
      // Get the user persona from localStorage or use default
      const defaultPersona = {
        description: "Default user",
        expertise: ["Web Design", "UI/UX Design"],
        industry: ["Technology"],
        skillLevel: "mid",
        typicalRates: {
          "Web Design": 1000,
          "Brand Identity": 2500,
          "Logo Design": 750,
          "UI Design": 800
        }
      }

      const userPersona = JSON.parse(localStorage.getItem('userPersona') || JSON.stringify(defaultPersona))
      
      console.log('Sending request with:', { projectDescription, userPersona })
      
      const suggestions = await suggestInvoiceItems(projectDescription, userPersona)
      console.log('Received suggestions:', suggestions)
      
      if (!suggestions || suggestions.length === 0) {
        throw new Error('No suggestions received')
      }

      const newItems = suggestions.map(item => ({
        name: item.name,
        rate: item.rate,
        quantity: 1
      }))
      
      const updatedInvoiceData = {
        ...invoiceData,
        items: newItems,
        projectDescription
      }
      
      setInvoiceData(updatedInvoiceData)
      onUpdateInvoice(updatedInvoiceData)

    } catch (error) {
      console.error('Error in handleAutoGenerate:', error)
      alert('Failed to generate items. Please try again.')
    } finally {
      setIsGenerating(false)
    }
  }

  const handleSaveAsDraft = async () => {
    try {
      const response = await fetch('/api/drafts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(invoiceData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to save draft')
      }

      alert('Draft saved successfully!')
    } catch (error) {
      console.error('Error saving draft:', error)
      alert(error instanceof Error ? error.message : 'Failed to save draft')
    }
  }

  const handleCreateInvoice = async () => {
    try {
      const response = await fetch('/api/invoices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(invoiceData)
      })

      if (!response.ok) throw new Error('Failed to create invoice')
      
      const invoice = await response.json()
      
      // Generate PDF after creating invoice
      await handleDownloadPdf()
      
      alert('Invoice created successfully!')
    } catch (error) {
      console.error('Error creating invoice:', error)
      alert('Failed to create invoice')
    }
  }

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-semibold">
          Create an <span className="text-purple-600">Invoice</span>
        </h1>
        <p className="text-gray-500">Just fill this form and you are done!</p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Client Details</h2>
          <Button variant="ghost" size="icon">
            <Minus className="h-4 w-4" />
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              placeholder="Alex"
              value={invoiceData.firstName}
              onChange={(e) => updateField("firstName", e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              placeholder="Ferucio"
              value={invoiceData.lastName}
              onChange={(e) => updateField("lastName", e.target.value)}
            />
          </div>
        </div>

        <div>
          <Label htmlFor="email">Mail</Label>
          <Input
            id="email"
            type="email"
            placeholder="example@mail.com"
            value={invoiceData.email}
            onChange={(e) => updateField("email", e.target.value)}
          />
        </div>

        <div>
          <Label>Address</Label>
          <AddressInput
            value={invoiceData.address}
            onChange={(address) => updateField("address", address)}
            placeholder="Client's Address (Office or Personal)"
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Service Details</h2>
          <Button className="bg-purple-100 text-purple-600 hover:bg-purple-200">AI Powered</Button>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <Label>Describe the Project</Label>
            <Button
              variant="secondary"
              size="sm"
              onClick={handleAutoGenerate}
              disabled={isGenerating || !projectDescription}
              className="bg-purple-100 text-purple-600 hover:bg-purple-200"
            >
              <Sparkles className="mr-2 h-4 w-4" />
              {isGenerating ? "Generating..." : "Auto Generate Items"}
            </Button>
          </div>
          <Textarea
            value={projectDescription}
            onChange={(e) => {
              setProjectDescription(e.target.value)
              onUpdateInvoice({
                ...invoiceData,
                projectDescription: e.target.value
              })
            }}
            placeholder="Example: 4 page Web Design using figma"
            className="min-h-[100px]"
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Items</h2>
          <span className="text-gray-500">Auto Generated</span>
        </div>

        {invoiceData.items.map((item, index) => (
          <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
            <div className="relative flex-1">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                <Package className="h-4 w-4" />
              </div>
              <input
                type="text"
                value={item.name}
                onChange={(e) => updateItem(index, 'name', e.target.value)}
                className="bg-gray-200 pl-10 pr-4 py-2 rounded w-full"
                placeholder="Item name"
              />
            </div>
            
            <div className="relative w-32">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                {currency}
              </div>
              <input
                type="number"
                value={item.rate}
                onChange={(e) => updateItem(index, 'rate', Number(e.target.value))}
                className="bg-gray-200 pl-8 pr-4 py-2 rounded w-full"
                placeholder="Rate"
              />
            </div>
            
            <div className="relative w-24">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                <Hash className="h-4 w-4" />
              </div>
              <input
                type="number"
                value={item.quantity}
                onChange={(e) => updateItem(index, 'quantity', Number(e.target.value))}
                className="bg-gray-200 pl-10 pr-4 py-2 rounded w-full"
                placeholder="Qty"
              />
            </div>

            <div className="bg-purple-100 px-4 py-2 rounded text-purple-600 font-medium">
              {currency}{(item.rate * item.quantity).toLocaleString()}
            </div>
            
            <Button 
              variant="ghost" 
              size="icon" 
              className="ml-auto text-red-500 hover:text-red-700 hover:bg-red-50" 
              onClick={() => removeItem(index)}
            >
              <Minus className="h-4 w-4" />
            </Button>
          </div>
        ))}

        <div className="flex items-center justify-between text-sm text-purple-600">
          <span>💡 Tip: You can click to edit the items</span>
          <Button
            variant="outline"
            size="sm"
            onClick={addItem}
            className="border-dashed border-purple-600 text-purple-600"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add New Item
          </Button>
        </div>
      </div>

      <div className="flex gap-4">
        <Button onClick={handleSaveAsDraft} variant="outline">
          Save as Draft
        </Button>
        
        <Button onClick={handleCreateInvoice} className="flex-1 bg-purple-600">
          Create & Download Invoice
        </Button>

        <Dialog open={isEmailDialogOpen} onOpenChange={setIsEmailDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex-1">
              <Send className="mr-2 h-4 w-4" />
              Share Invoice
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Send Invoice via Email</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <Label htmlFor="emailTo">Recipient Email</Label>
                <Input
                  id="emailTo"
                  type="email"
                  value={emailTo}
                  onChange={(e) => setEmailTo(e.target.value)}
                  placeholder="client@example.com"
                />
              </div>
              <div>
                <Label htmlFor="emailSubject">Subject</Label>
                <Input id="emailSubject" value={emailSubject} onChange={(e) => setEmailSubject(e.target.value)} />
              </div>
              <div>
                <Label htmlFor="emailMessage">Message</Label>
                <Textarea
                  id="emailMessage"
                  value={emailMessage}
                  onChange={(e) => setEmailMessage(e.target.value)}
                  rows={4}
                />
              </div>
              <Button
                onClick={handleSendEmail}
                className="w-full bg-purple-600 hover:bg-purple-700"
                disabled={isSendingEmail}
              >
                {isSendingEmail ? "Sending..." : "Send Email"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

