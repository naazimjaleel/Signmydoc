import type { InvoiceData } from "../invoice-form"

interface TemplateProps {
  data: InvoiceData
}

export function ModernTemplate({ data }: TemplateProps) {
  const totalAmount = data.items.reduce((sum, item) => sum + item.rate * item.quantity, 0)

  return (
    <div>
      <div className="bg-purple-600 text-white p-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">INVOICE</h1>
          <div className="text-right">
            <p className="text-sm opacity-80">Invoice Number</p>
            <p className="font-semibold">00001</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-2 gap-8 mb-8">
          <div>
            <p className="text-sm text-gray-500 mb-1">From</p>
            <p className="font-semibold">Naazim Jaleel</p>
            <p className="text-sm text-gray-500">
              Holdy House, 3rd Avenue,
              <br />
              Koottilangadu,Malappuram
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">To</p>
            <p className="font-semibold">
              {data.firstName} {data.lastName}
            </p>
            <p className="text-sm text-gray-500">{data.email}</p>
            <p className="text-sm text-gray-500">{data.address}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 mb-8">
          <div>
            <p className="text-sm text-gray-500 mb-1">Issue Date</p>
            <p>23 May 2024</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Due Date</p>
            <p>13 June 2024</p>
          </div>
        </div>

        <div className="mb-8">
          <div className="bg-gray-100 p-4 rounded-t-lg grid grid-cols-12 gap-4">
            <div className="col-span-6 font-semibold">Description</div>
            <div className="col-span-2 font-semibold text-right">Rate</div>
            <div className="col-span-2 font-semibold text-center">QTY</div>
            <div className="col-span-2 font-semibold text-right">Amount</div>
          </div>

          {data.items.map((item, index) => (
            <div key={index} className="p-4 grid grid-cols-12 gap-4 border-b">
              <div className="col-span-6">{item.name}</div>
              <div className="col-span-2 text-right">{item.rate}</div>
              <div className="col-span-2 text-center">{item.quantity}</div>
              <div className="col-span-2 text-right">{item.rate * item.quantity}</div>
            </div>
          ))}

          <div className="p-4 grid grid-cols-12 gap-4 bg-gray-100 rounded-b-lg">
            <div className="col-span-10 font-semibold">Total Amount</div>
            <div className="col-span-2 font-semibold text-right">{totalAmount}</div>
          </div>
        </div>

        <div className="border-t pt-4">
          <h2 className="font-semibold mb-2">Notes</h2>
          <p className="text-sm text-gray-500">Thank you for your Business!</p>
        </div>
      </div>
    </div>
  )
}

