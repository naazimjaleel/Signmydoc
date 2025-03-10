import { type NextRequest, NextResponse } from "next/server"
import puppeteer from "puppeteer"
import { renderToString } from "react-dom/server"
import { ClassicTemplate } from "@/components/invoice-templates/classic"
import { ModernTemplate } from "@/components/templates/modern"
import { MinimalTemplate } from "@/components/templates/minimal"
import { BoldTemplate } from "@/components/invoice-templates/bold"

export async function POST(req: NextRequest) {
  try {
    const { template, invoiceData } = await req.json()
    let renderedTemplate = ""

    switch (template) {
      case "modern":
        renderedTemplate = renderToString(
          <ModernTemplate invoiceData={invoiceData} />
        )
        break
      case "minimal":
        renderedTemplate = renderToString(
          <MinimalTemplate invoiceData={invoiceData} />
        )
        break
      case "bold":
        renderedTemplate = renderToString(<BoldTemplate data={invoiceData} />)
        break
      default:
        throw new Error("Invalid template")
    }

    // Create HTML with the rendered template
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Invoice</title>
          <style>
            body {
              font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
              margin: 0;
              padding: 0;
            }
          </style>
        </head>
        <body>
          ${renderedTemplate}
        </body>
      </html>
    `

    // Launch Puppeteer
    const browser = await puppeteer.launch({ headless: true })
    const page = await browser.newPage()

    // Set content and generate PDF
    await page.setContent(html)
    const pdf = await page.pdf({ format: "A4", printBackground: true })

    await browser.close()

    // Return the PDF
    return new NextResponse(pdf, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="invoice.pdf"',
      },
    })
  } catch (error) {
    console.error("Error generating PDF:", error)
    return NextResponse.json(
      { error: "Failed to generate PDF" },
      { status: 500 }
    )
  }
}

