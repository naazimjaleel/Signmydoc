import fs from "fs"
import path from "path"
import type { InvoiceData } from "@/components/invoice-form"
import { PrismaClient } from '@prisma/client'

interface Invoice {
  id: string
  title: string
  type: "Invoice" | "Contract"
  date: string
  data: InvoiceData
  template: string
  isAIGenerated?: boolean
}

interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  password: string // In a real app, this would be hashed
  address?: string
  description?: string
  currency?: string
}

interface DB {
  users: User[]
  invoices: Invoice[]
}

const DB_PATH = path.join(process.cwd(), "data", "db.json")

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

// Initialize the database if it doesn't exist
function initDB() {
  const dir = path.join(process.cwd(), "data")
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }

  if (!fs.existsSync(DB_PATH)) {
    const initialData: DB = {
      users: [],
      invoices: [],
    }
    fs.writeFileSync(DB_PATH, JSON.stringify(initialData, null, 2))
  }
}

// Read the database
function readDB(): DB {
  initDB()
  const data = fs.readFileSync(DB_PATH, "utf-8")
  return JSON.parse(data)
}

// Write to the database
function writeDB(data: DB) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2))
}

// User functions
export function createUser(user: Omit<User, "id">): User {
  const db = readDB()
  const newUser: User = {
    ...user,
    id: Date.now().toString(),
  }
  db.users.push(newUser)
  writeDB(db)
  return newUser
}

export function getUserByEmail(email: string): User | undefined {
  const db = readDB()
  return db.users.find((user) => user.email === email)
}

export function updateUser(id: string, userData: Partial<User>): User | null {
  const db = readDB()
  const userIndex = db.users.findIndex((user) => user.id === id)

  if (userIndex === -1) return null

  const updatedUser = {
    ...db.users[userIndex],
    ...userData,
  }

  db.users[userIndex] = updatedUser
  writeDB(db)

  return updatedUser
}

// Invoice functions
export function createInvoice(invoice: Omit<Invoice, "id">): Invoice {
  const db = readDB()
  const newInvoice: Invoice = {
    ...invoice,
    id: Date.now().toString(),
  }
  db.invoices.push(newInvoice)
  writeDB(db)
  return newInvoice
}

export function getInvoicesByUserId(userId: string): Invoice[] {
  const db = readDB()
  return db.invoices.filter((invoice) => invoice.data.email === db.users.find((user) => user.id === userId)?.email)
}

export function getInvoiceById(id: string): Invoice | undefined {
  const db = readDB()
  return db.invoices.find((invoice) => invoice.id === id)
}

export function updateInvoice(id: string, invoiceData: Partial<Invoice>): Invoice | null {
  const db = readDB()
  const invoiceIndex = db.invoices.findIndex((invoice) => invoice.id === id)

  if (invoiceIndex === -1) return null

  const updatedInvoice = {
    ...db.invoices[invoiceIndex],
    ...invoiceData,
  }

  db.invoices[invoiceIndex] = updatedInvoice
  writeDB(db)

  return updatedInvoice
}

export function deleteInvoice(id: string): boolean {
  const db = readDB()
  const initialLength = db.invoices.length
  db.invoices = db.invoices.filter((invoice) => invoice.id !== id)

  if (db.invoices.length === initialLength) return false

  writeDB(db)
  return true
}

