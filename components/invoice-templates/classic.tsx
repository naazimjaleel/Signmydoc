import type { InvoiceData } from "../invoice-form"

interface TemplateProps {
  data: InvoiceData
}

export function ClassicTemplate({ data }: TemplateProps) {
  const totalAmount = data.items.reduce((sum, item) => sum + item.rate * item.quantity, 0)

  return (
    <div className="p-6">
      <div className="flex justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold mb-1">INVOICE</h1>
          <p className="text-gray-500">Invoice Number: 00001</p>
        </div>
        <div className="text-right">
          <div className="w-16 h-8 bg-gray-200 rounded" />
          <p className="mt-2">Naazim Jaleel</p>
          <p className="text-sm text-gray-500">
            Holdy House, 3rd Avenue,
            <br />
            Koottilangadu,Malappuram
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8 mb-8">
        <div>
          <h2 className="font-semibold mb-2">Billed to</h2>
          <p>
            {data.firstName} {data.lastName}
          </p>
          <p className="text-sm text-gray-500">{data.email}</p>
          <p className="text-sm text-gray-500">{data.address}</p>
        </div>
        <div className="text-right">
          <div className="mb-4">
            <h2 className="font-semibold mb-1">Date Issued</h2>
            <p className="text-sm text-gray-500">23 May 2024</p>
          </div>
          <div>
            <h2 className="font-semibold mb-1">Due Date</h2>
            <p className="text-sm text-gray-500">13 June 2024</p>
          </div>
        </div>
      </div>

      <table className="w-full mb-8">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="py-2 px-4 text-left">Description</th>
            <th className="py-2 px-4 text-right">Rate</th>
            <th className="py-2 px-4 text-center">QTY</th>
            <th className="py-2 px-4 text-right">Amount</th>
          </tr>
        </thead>
        <tbody>
          {data.items.map((item, index) => (
            <tr key={index} className="border-b">
              <td className="py-2 px-4">{item.name}</td>
              <td className="py-2 px-4 text-right">{item.rate}</td>
              <td className="py-2 px-4 text-center">{item.quantity}</td>
              <td className="py-2 px-4 text-right">{item.rate * item.quantity}</td>
            </tr>
          ))}
          <tr className="bg-gray-800 text-white">
            <td colSpan={3} className="py-2 px-4 font-semibold">
              Total Amount
            </td>
            <td className="py-2 px-4 text-right font-semibold">{totalAmount}</td>
          </tr>
        </tbody>
      </table>

      <div>
        <h2 className="font-semibold mb-2">Notes</h2>
        <p className="text-sm text-gray-500">Thank you for your Business!</p>
      </div>
    </div>
  )
}

