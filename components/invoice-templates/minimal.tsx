import type { InvoiceData } from "../invoice-form"

interface TemplateProps {
  data: InvoiceData
}

export function MinimalTemplate({ data }: TemplateProps) {
  const totalAmount = data.items.reduce((sum, item) => sum + item.rate * item.quantity, 0)

  return (
    <div className="p-8 font-light">
      <div className="flex justify-between mb-12">
        <div>
          <h1 className="text-4xl font-light mb-1">Invoice</h1>
          <p className="text-gray-500"># 00001</p>
        </div>
        <div className="text-right">
          <div className="w-16 h-8 bg-gray-100 rounded" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8 mb-12">
        <div>
          <p className="text-xs uppercase tracking-wider text-gray-500 mb-2">From</p>
          <p>Naazim Jaleel</p>
          <p className="text-sm text-gray-500">
            Holdy House, 3rd Avenue,
            <br />
            Koottilangadu,Malappuram
          </p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wider text-gray-500 mb-2">Bill To</p>
          <p>
            {data.firstName} {data.lastName}
          </p>
          <p className="text-sm text-gray-500">{data.email}</p>
          <p className="text-sm text-gray-500">{data.address}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8 mb-12">
        <div>
          <p className="text-xs uppercase tracking-wider text-gray-500 mb-2">Issue Date</p>
          <p>23 May 2024</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wider text-gray-500 mb-2">Due Date</p>
          <p>13 June 2024</p>
        </div>
      </div>

      <div className="mb-12">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="py-2 text-left font-normal text-xs uppercase tracking-wider text-gray-500">Description</th>
              <th className="py-2 text-right font-normal text-xs uppercase tracking-wider text-gray-500">Rate</th>
              <th className="py-2 text-center font-normal text-xs uppercase tracking-wider text-gray-500">QTY</th>
              <th className="py-2 text-right font-normal text-xs uppercase tracking-wider text-gray-500">Amount</th>
            </tr>
          </thead>
          <tbody>
            {data.items.map((item, index) => (
              <tr key={index} className="border-b">
                <td className="py-4">{item.name}</td>
                <td className="py-4 text-right">{item.rate}</td>
                <td className="py-4 text-center">{item.quantity}</td>
                <td className="py-4 text-right">{item.rate * item.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-end mt-4">
          <div className="w-1/3">
            <div className="flex justify-between py-2">
              <span className="font-light">Total</span>
              <span>{totalAmount}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center text-sm text-gray-500 mt-16">
        <p>Thank you for your business!</p>
      </div>
    </div>
  )
}

