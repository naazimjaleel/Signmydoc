"use client"

import { InvoiceData } from "../invoice-form"

interface TemplateProps {
  data: InvoiceData
}

export function ModernTemplate({ data }: TemplateProps) {
  const total = data.items.reduce((sum, item) => sum + (item.rate * item.quantity), 0)

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ padding: '40px' }}>
        <h1 style={{ color: '#6B46C1', marginBottom: '30px' }}>Invoice</h1>
        
        <div style={{ marginBottom: '30px' }}>
          <h2>Bill To:</h2>
          <p>{data.firstName} {data.lastName}</p>
          <p>{data.email}</p>
          <p>{data.address}</p>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '30px' }}>
          <thead>
            <tr style={{ backgroundColor: '#F3F4F6' }}>
              <th style={{ padding: '12px', textAlign: 'left' }}>Item</th>
              <th style={{ padding: '12px', textAlign: 'right' }}>Rate</th>
              <th style={{ padding: '12px', textAlign: 'right' }}>Qty</th>
              <th style={{ padding: '12px', textAlign: 'right' }}>Amount</th>
            </tr>
          </thead>
          <tbody>
            {data.items.map((item, index) => (
              <tr key={index} style={{ borderBottom: '1px solid #E5E7EB' }}>
                <td style={{ padding: '12px' }}>{item.name}</td>
                <td style={{ padding: '12px', textAlign: 'right' }}>${item.rate}</td>
                <td style={{ padding: '12px', textAlign: 'right' }}>{item.quantity}</td>
                <td style={{ padding: '12px', textAlign: 'right' }}>${item.rate * item.quantity}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={3} style={{ padding: '12px', textAlign: 'right', fontWeight: 'bold' }}>Total:</td>
              <td style={{ padding: '12px', textAlign: 'right', fontWeight: 'bold' }}>${total}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  )
} 