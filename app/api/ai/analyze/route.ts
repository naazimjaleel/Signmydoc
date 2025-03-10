import { OpenAI } from "openai"
import { NextResponse } from "next/server"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

export async function POST(req: Request) {
  try {
    const { projectDescription, userPersona } = await req.json()
    
    if (!projectDescription) {
      return NextResponse.json(
        { error: "Project description is required" },
        { status: 400 }
      )
    }

    console.log('Processing request:', { projectDescription, userPersona }) // Debug log

    const prompt = `
As an AI assistant for a freelance invoicing system, analyze this project description and user's expertise to suggest appropriate invoice items.

Project Description: "${projectDescription}"

User's Expertise: ${JSON.stringify(userPersona.expertise)}
Industry Focus: ${JSON.stringify(userPersona.industry)}
Skill Level: ${userPersona.skillLevel}

Generate invoice items in this JSON format:
{
  "items": [
    {
      "name": "Item name",
      "rate": number (based on expertise and market rates),
      "description": "Detailed description of the service"
    }
  ],
  "analysis": "Brief explanation of the suggested items and rates"
}

Consider:
1. Project scope and complexity
2. User's expertise level
3. Industry standards
4. Additional related services that might be valuable
`

    console.log('Sending prompt to OpenAI') // Debug log

    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-4-turbo-preview",
      response_format: { type: "json_object" }
    })

    console.log('Received response from OpenAI') // Debug log

    const response = JSON.parse(completion.choices[0].message.content)
    return NextResponse.json(response)

  } catch (error) {
    console.error('AI Analysis Error:', error)
    return NextResponse.json(
      { error: error.message || "Failed to analyze project" },
      { status: 500 }
    )
  }
} 