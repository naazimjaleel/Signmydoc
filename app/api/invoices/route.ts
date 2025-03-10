import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/firebase"
import { collection, addDoc, getDocs, query, where } from "firebase/firestore"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { PrismaClient } from "@prisma/client"

// This would typically be connected to a database
let invoices: any[] = []

const prisma = new PrismaClient()

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const data = await req.json()
    const docRef = await addDoc(collection(db, "invoices"), {
      userId: session.user.id,
      clientName: data.clientName,
      clientEmail: data.clientEmail,
      address: data.address,
      items: data.items,
      total: data.items.reduce((sum: number, item: any) => sum + (item.rate * item.quantity), 0),
    })
    return NextResponse.json({ id: docRef.id })
  } catch (error) {
    console.error("Error creating invoice:", error)
    return NextResponse.json({ error: "Failed to create invoice" }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url)
    const userId = url.searchParams.get("userId")

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 })
    }

    const q = query(collection(db, "invoices"), where("userId", "==", userId))
    const querySnapshot = await getDocs(q)
    const invoices = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    
    return NextResponse.json(invoices)
  } catch (error) {
    console.error("Error fetching invoices:", error)
    return NextResponse.json({ error: "Failed to fetch invoices" }, { status: 500 })
  }
}

const handleSaveAsDraft = async () => {
  try {
    console.log("Draft data:", JSON.stringify(invoiceData)); // Log the data
    const response = await fetch('/api/drafts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(invoiceData),
    });

    const data = await response.json(); // Parse the response

    if (!response.ok) {
      throw new Error(data.error || 'Failed to save draft');
    }

    alert('Draft saved successfully!');
  } catch (error) {
    console.error('Error saving draft:', error);
    alert(error instanceof Error ? error.message : 'Failed to save draft');
  }
};

