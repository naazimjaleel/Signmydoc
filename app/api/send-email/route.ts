import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

function generateEmailHTML(invoiceData: any, template: string) {
  const total = invoiceData.items.reduce((sum: number, item: any) => sum + (item.rate * item.quantity), 0)
  
  const itemsHTML = invoiceData.items.map((item: any) => `
    <tr style="border-bottom: 1px solid #E5E7EB">
      <td style="padding: 12px">${item.name}</td>
      <td style="padding: 12px; text-align: right">$${item.rate}</td>
      <td style="padding: 12px; text-align: right">${item.quantity}</td>
      <td style="padding: 12px; text-align: right">$${item.rate * item.quantity}</td>
    </tr>
  `).join('')

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Invoice</title>
      </head>
      <body style="font-family: Arial, sans-serif; margin: 0; padding: 40px;">
        <div style="max-width: 800px; margin: 0 auto;">
          <h1 style="color: #6B46C1; margin-bottom: 30px;">Invoice</h1>
          
          <div style="margin-bottom: 30px;">
            <h2>Bill To:</h2>
            <p>${invoiceData.firstName} ${invoiceData.lastName}</p>
            <p>${invoiceData.email}</p>
            <p>${invoiceData.address}</p>
          </div>

          <table style="width: 100%; border-collapse: collapse; margin-bottom: 30px;">
            <thead>
              <tr style="background-color: #F3F4F6;">
                <th style="padding: 12px; text-align: left">Item</th>
                <th style="padding: 12px; text-align: right">Rate</th>
                <th style="padding: 12px; text-align: right">Qty</th>
                <th style="padding: 12px; text-align: right">Amount</th>
              </tr>
            </thead>
            <tbody>
              ${itemsHTML}
            </tbody>
            <tfoot>
              <tr>
                <td colspan="3" style="padding: 12px; text-align: right; font-weight: bold">Total:</td>
                <td style="padding: 12px; text-align: right; font-weight: bold">$${total}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </body>
    </html>
  `
}

export async function POST(req: Request) {
  try {
    const { invoiceData, template, to, subject, message } = await req.json()
    
    console.log('Sending email to:', to)

    const htmlContent = generateEmailHTML(invoiceData, template)

    const data = await resend.emails.send({
      from: 'SignMyDoc <invoices@yourdomain.com>',
      to: [to],
      subject,
      html: htmlContent,
      text: message,
    })

    console.log('Email sent:', data)

    return NextResponse.json({ success: true, id: data.id })
  } catch (error) {
    console.error('Error in email route:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to send email' },
      { status: 500 }
    )
  }
}

