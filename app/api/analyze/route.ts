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

    // Basic analysis based on project description
    const suggestions = analyzeProject(projectDescription, userPersona)

    return NextResponse.json({
      items: suggestions,
      analysis: "Suggested items based on project description and standard rates."
    })

  } catch (error: any) {
    console.error('Analysis Error:', error)
    return NextResponse.json(
      { error: error?.message || "Failed to analyze project" },
      { status: 500 }
    )
  }
}

function analyzeProject(description: string, userPersona: any) {
  const keywords = description.toLowerCase()
  const suggestions = []

  // Basic project setup
  suggestions.push({
    name: "Project Setup & Planning",
    rate: 50,
    description: "Initial project setup and planning phase"
  })

  // Development work
  if (keywords.includes('website') || keywords.includes('web') || keywords.includes('app')) {
    suggestions.push({
      name: "Development",
      rate: 75,
      description: "Core development work"
    })
  }

  // Design work
  if (keywords.includes('design') || keywords.includes('ui') || keywords.includes('ux')) {
    suggestions.push({
      name: "Design & UI/UX",
      rate: 65,
      description: "Design and user experience work"
    })
  }

  // Testing
  suggestions.push({
    name: "Testing & Quality Assurance",
    rate: 60,
    description: "Testing and quality assurance"
  })

  return suggestions
} 