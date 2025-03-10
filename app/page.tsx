"use client"

import Link from "next/link"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <section className="container mx-auto px-4 py-20 flex flex-col items-center text-center">
          <h1 className="text-5xl font-bold mb-6">
            Create Professional Invoices <span className="text-purple-600">in Seconds</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-2xl">
            Simple, professional, and powerful invoicing solution for freelancers and small businesses.
          </p>
          
          <div className="flex gap-4">
            <Link href="/signup">
              <Button className="bg-purple-600 text-white hover:bg-purple-700 text-lg px-8 py-6">
                Get Started - It's Free
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="outline" className="text-lg px-8 py-6">
                Login to Dashboard
              </Button>
            </Link>
          </div>
        </section>

        <section className="bg-gray-50 py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Why Choose Our Invoice App?
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-4">Easy to Use</h3>
                <p className="text-gray-600">Create and send professional invoices in just a few clicks.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-4">Professional Templates</h3>
                <p className="text-gray-600">Choose from multiple beautifully designed invoice templates.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-4">Secure & Reliable</h3>
                <p className="text-gray-600">Your data is always safe and backed up in the cloud.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-8">
        <div className="container mx-auto px-4 text-center text-gray-600">
          © 2024 InvoiceApp. All rights reserved.
        </div>
      </footer>
    </div>
  )
}

