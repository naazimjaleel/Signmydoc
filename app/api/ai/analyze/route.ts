import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { projectDescription, userPersona } = await req.json()
    
    if (!projectDescription) {
      return NextResponse.json(
        { error: "Project description is required" },
        { status: 400 }
      )
    }

    // Mock response
    const mockResponse = {
      items: [
        {
          name: "Project Setup & Planning",
          rate: 50,
          description: "Initial project setup and planning phase"
        },
        {
          name: "Development",
          rate: 75,
          description: "Core development work"
        },
        {
          name: "Testing & Quality Assurance",
          rate: 60,
          description: "Testing and quality assurance"
        }
      ],
      analysis: "Suggested items based on standard project phases. Rates are set according to industry standards."
    }

    return NextResponse.json(mockResponse)

  } catch (error: any) {
    console.error('Analysis Error:', error)
    return NextResponse.json(
      { error: error?.message || "Failed to analyze project" },
      { status: 500 }
    )
  }
} 