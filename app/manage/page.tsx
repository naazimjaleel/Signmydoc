"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { PenLine, Trash2, Send } from "lucide-react"
import Link from "next/link"

interface Invoice {
  id: string
  title: string
  type: string
  date: string
  data: any
  template: string
}

export default function ManagePage() {
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchInvoices()
  }, [])

  const fetchInvoices = async () => {
    try {
      const response = await fetch('/api/invoices')
      if (!response.ok) throw new Error('Failed to fetch invoices')
      const data = await response.json()
      setInvoices(data)
    } catch (error) {
      console.error('Error fetching invoices:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this invoice?')) return

    try {
      const response = await fetch(`/api/invoices/${id}`, {
        method: 'DELETE',
      })
      if (!response.ok) throw new Error('Failed to delete invoice')
      
      // Remove the deleted invoice from state
      setInvoices(invoices.filter(invoice => invoice.id !== id))
    } catch (error) {
      console.error('Error deleting invoice:', error)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <Header variant="dashboard" />
      
      <div className="container mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Your Vault</h1>
            <p className="text-gray-600">Your Recent Files</p>
          </div>
        </div>

        {isLoading ? (
          <div className="text-center py-12">Loading...</div>
        ) : invoices.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold mb-2">No invoices yet</h2>
            <p className="text-gray-600 mb-4">Create your first invoice to get started</p>
            <Link href="/">
              <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                Create Invoice
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid gap-4">
            {invoices.map((invoice) => (
              <div
                key={invoice.id}
                className="bg-white border rounded-lg p-6 flex items-center justify-between"
              >
                <div>
                  <h3 className="font-semibold text-lg">{invoice.title}</h3>
                  <p className="text-gray-600">
                    {new Date(invoice.date).toLocaleDateString()}
                  </p>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/edit/${invoice.id}`}>
                      <PenLine className="h-4 w-4 mr-2" />
                      Edit
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm">
                    <Send className="h-4 w-4 mr-2" />
                    Send
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleDelete(invoice.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

