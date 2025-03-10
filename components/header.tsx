"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useRouter } from "next/navigation"
import { ChevronDown, LogOut, PenLine, Settings2, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface HeaderProps {
  variant?: 'landing' | 'dashboard'
}

export function Header({ variant = 'landing' }: HeaderProps) {
  const pathname = usePathname()
  const router = useRouter()
  const isManagePage = pathname === "/manage"
  const isCreatePage = pathname === "/dashboard" || pathname === "/"

  const handleLogout = () => {
    // Add your logout logic here
    router.push("/login")
  }

  if (variant === 'landing') {
    return (
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-purple-600">
            signmydoc<span>.</span>
          </Link>
          
          <nav className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost">Log in</Button>
            </Link>
            <Link href="/signup">
              <Button className="bg-purple-600 text-white hover:bg-purple-700">
                Sign up
              </Button>
            </Link>
          </nav>
        </div>
      </header>
    )
  }

  return (
    <header className="flex items-center justify-between px-6 py-4 border-b">
      <Link href="/" className="text-2xl font-bold">
        signmydoc<span className="text-purple-600">.</span>
      </Link>

      <div className="flex items-center gap-2 bg-white rounded-full border p-1">
        <Button
          variant={isCreatePage ? "default" : "ghost"}
          className={`rounded-full ${isCreatePage ? "bg-purple-600 hover:bg-purple-700" : ""}`}
          asChild
        >
          <Link href="/dashboard">
            <PenLine className="mr-2 h-4 w-4" />
            Create
          </Link>
        </Button>
        <Button
          variant={isManagePage ? "default" : "ghost"}
          className={`rounded-full ${isManagePage ? "bg-purple-600 hover:bg-purple-700" : ""}`}
          asChild
        >
          <Link href="/manage">
            <Settings2 className="mr-2 h-4 w-4" />
            Manage
          </Link>
        </Button>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="rounded-full flex items-center gap-2 bg-purple-50 text-black">
            <img
              src={`${process.env.NEXT_PUBLIC_AVATAR_URL || "https://github.com/shadcn.png"}`}
              alt="Profile"
              className="w-8 h-8 rounded-full"
            />
            <span>John Smith</span>
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>
            <User className="mr-2 h-4 w-4" />
            Edit my Persona
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  )
}

