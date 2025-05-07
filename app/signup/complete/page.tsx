"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, MapPin, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createUserPersona } from "@/lib/suggestions"
import { AddressInput } from "@/components/address-input"

export default function CompleteSignUpPage() {
  const router = useRouter()
  const [description, setDescription] = useState("")
  const [address, setAddress] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      // Create and save user persona
      const persona = await createUserPersona(description)
      localStorage.setItem('userPersona', JSON.stringify(persona))
      
      router.push("/dashboard")
    } catch (error) {
      console.error('Error creating persona:', error)
      alert('Failed to complete signup. Please try again.')
    }
  }

  return (
    <div className="min-h-screen bg-white flex">
      <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:flex-none lg:w-[600px]">
        <div className="mx-auto w-full max-w-sm">
          <div className="mb-8">
            <Button variant="ghost" className="mb-8" onClick={() => router.back()}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>

            <div className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 mb-6">
              ❤️ Making it all yours!
            </div>

            <h2 className="text-4xl font-semibold text-gray-900">Let's get you all set!</h2>
            <p className="mt-2 text-gray-500">These details will be used to create your invoices.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label>Choose Location</Label>
              <AddressInput
                value={address}
                onChange={setAddress}
                placeholder="Your Address (Office or Personal)"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Logo (Optional)</Label>
                <Button variant="outline" className="w-full bg-purple-50 text-purple-600 hover:bg-purple-100">
                  <Upload className="mr-2 h-4 w-4" />
                  Upload
                </Button>
              </div>
              <div>
                <Label>Currency Preference</Label>
                <Select defaultValue="INR">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="INR">₹ INR</SelectItem>
                    <SelectItem value="USD">$ USD</SelectItem>
                    <SelectItem value="EUR">€ EUR</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <Label>Describe Yourself</Label>
                <Button variant="secondary" size="sm" className="bg-purple-100 text-purple-600 hover:bg-purple-200">
                  AI Powered ✨
                </Button>
              </div>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="I am a freelance graphic designer specializing in logo design and branding for startups."
                className="min-h-[100px]"
              />
            </div>

            <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">
              Complete Sign Up
            </Button>

            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Step 2 of 2</span>
              <Link href="/login" className="text-sm text-purple-600 hover:underline">
                Login
              </Link>
            </div>
          </form>
        </div>
      </div>
      <div className="hidden lg:block relative flex-1 bg-gradient-to-br from-purple-100 to-purple-600">
        <div className="absolute bottom-8 right-8">
          <Link href="/" className="text-2xl font-bold text-white">
            signmydoc<span className="text-purple-200">.</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

