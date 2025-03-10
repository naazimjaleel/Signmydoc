"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Upload, Save } from "lucide-react"

interface ProfileData {
  firstName: string
  lastName: string
  email: string
  address: string
  description: string
  currency: string
}

export default function ProfilePage() {
  const router = useRouter()
  const [profileData, setProfileData] = useState<ProfileData>({
    firstName: "John",
    lastName: "Smith",
    email: "john@example.com",
    address: "123 Main St, New York, NY",
    description: "I am a freelance graphic designer specializing in logo design and branding for startups.",
    currency: "USD",
  })

  const handleChange = (field: keyof ProfileData, value: string) => {
    setProfileData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Save profile data
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="container mx-auto px-6 py-8 max-w-3xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-gray-800 mb-1">Edit Profile</h1>
          <p className="text-gray-500">Update your personal information</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-20 h-20 rounded-full bg-purple-100 flex items-center justify-center overflow-hidden">
              <img
                src={`${process.env.NEXT_PUBLIC_AVATAR_URL || "https://github.com/shadcn.png"}`}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 className="font-semibold">Profile Picture</h2>
              <Button variant="outline" size="sm" className="mt-2">
                <Upload className="mr-2 h-4 w-4" />
                Change Photo
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                value={profileData.firstName}
                onChange={(e) => handleChange("firstName", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                value={profileData.lastName}
                onChange={(e) => handleChange("lastName", e.target.value)}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={profileData.email}
              onChange={(e) => handleChange("email", e.target.value)}
            />
          </div>

          <div>
            <Label>Address</Label>
            <Button variant="outline" className="w-full justify-start text-gray-500">
              <MapPin className="mr-2 h-4 w-4 text-purple-600" />
              {profileData.address || "Your Address (Office or Personal)"}
            </Button>
          </div>

          <div>
            <Label htmlFor="currency">Currency Preference</Label>
            <Select value={profileData.currency} onValueChange={(value) => handleChange("currency", value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="USD">$ USD</SelectItem>
                <SelectItem value="EUR">€ EUR</SelectItem>
                <SelectItem value="GBP">£ GBP</SelectItem>
                <SelectItem value="INR">₹ INR</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="description">Professional Description</Label>
            <Textarea
              id="description"
              value={profileData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              className="min-h-[100px]"
            />
          </div>

          <div className="pt-4">
            <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </Button>
          </div>
        </form>
      </main>
    </div>
  )
}

