"use client"

import type React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function SignUpPage() {
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Add your signup logic here
    router.push("/signup/complete")
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
              😊 For Freelancers, by Freelancers
            </div>

            <h2 className="text-4xl font-semibold text-gray-900">Welcome to Signmydoc!</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" placeholder="Alex" required />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" placeholder="Ferucio" required />
              </div>
            </div>

            <div>
              <Label htmlFor="email">Mail</Label>
              <Input id="email" type="email" placeholder="example@mail.com" required />
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="6+ Characters" required />
            </div>

            <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">
              Sign Up
            </Button>

            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Step 1 of 2</span>
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

