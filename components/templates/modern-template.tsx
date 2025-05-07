interface ModernTemplateProps {
  invoiceData: {
    firstName: string
    lastName: string
    email: string
    address: string
    projectDescription: string
    items: Array<{
      name: string
      rate: number
      quantity: number
    }>
  }
}

export function ModernTemplate({ invoiceData }: ModernTemplateProps) {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Invoice</h1>
        <div className="text-gray-600">
          <p>{invoiceData.firstName} {invoiceData.lastName}</p>
          <p>{invoiceData.email}</p>
          <p>{invoiceData.address}</p>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Project Description</h2>
        <p className="text-gray-700">{invoiceData.projectDescription}</p>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Items</h2>
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2">Item</th>
              <th className="text-right py-2">Rate</th>
              <th className="text-right py-2">Quantity</th>
              <th className="text-right py-2">Total</th>
            </tr>
          </thead>
          <tbody>
            {invoiceData.items.map((item, index) => (
              <tr key={index} className="border-b">
                <td className="py-2">{item.name}</td>
                <td className="text-right py-2">${item.rate}</td>
                <td className="text-right py-2">{item.quantity}</td>
                <td className="text-right py-2">${item.rate * item.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 