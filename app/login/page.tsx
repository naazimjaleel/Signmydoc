"use client"

import type React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"

export default function LoginPage() {
  const router = useRouter()
  const [error, setError] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    const email = (form.elements.namedItem('email') as HTMLInputElement).value
    const password = (form.elements.namedItem('password') as HTMLInputElement).value

    // Test credentials
    if (email === "test@example.com" && password === "password123") {
      // Successful login
      router.push("/dashboard")
    } else {
      // Failed login
      setError("Invalid email or password")
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
              🤝 For Freelancers, by Freelancers
            </div>

            <h2 className="text-4xl font-semibold text-gray-900">Welcome back!</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="email">Mail</Label>
              <Input id="email" type="email" placeholder="example@mail.com" required />
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="6+ Characters" required />
            </div>

            {error && (
              <div className="text-red-500 text-sm">{error}</div>
            )}

            <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">
              Login
            </Button>

            <div className="mt-4 p-4 bg-gray-50 rounded-lg text-sm">
              <p className="font-medium mb-2">Test Credentials:</p>
              <p>Email: test@example.com</p>
              <p>Password: password123</p>
            </div>

            <div className="flex items-center justify-between mt-4">
              <span className="text-sm text-gray-500">
                Don't have an account?{" "}
                <Link href="/signup" className="text-purple-600 hover:underline">
                  Sign up
                </Link>
              </span>
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

