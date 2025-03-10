import type { InvoiceData } from "../invoice-form"

interface TemplateProps {
  data: InvoiceData
}

export function BoldTemplate({ data }: TemplateProps) {
  const totalAmount = data.items.reduce((sum, item) => sum + item.rate * item.quantity, 0)

  return (
    <div>
      <div className="bg-black text-white p-8">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold">INVOICE</h1>
          <div className="text-right">
            <p className="text-xl">#00001</p>
          </div>
        </div>
      </div>

      <div className="p-8">
        <div className="grid grid-cols-2 gap-8 mb-8">
          <div>
            <h2 className="text-xl font-bold mb-4 uppercase">From</h2>
            <p className="font-bold">Naazim Jaleel</p>
            <p>
              Holdy House, 3rd Avenue,
              <br />
              Koottilangadu,Malappuram
            </p>
          </div>
          <div>
            <h2 className="text-xl font-bold mb-4 uppercase">To</h2>
            <p className="font-bold">
              {data.firstName} {data.lastName}
            </p>
            <p>{data.email}</p>
            <p>{data.address}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 mb-8">
          <div>
            <h2 className="text-xl font-bold mb-4 uppercase">Issue Date</h2>
            <p>23 May 2024</p>
          </div>
          <div>
            <h2 className="text-xl font-bold mb-4 uppercase">Due Date</h2>
            <p>13 June 2024</p>
          </div>
        </div>

        <div className="mb-8">
          <div className="bg-black text-white p-4 grid grid-cols-12 gap-4">
            <div className="col-span-6 font-bold">DESCRIPTION</div>
            <div className="col-span-2 font-bold text-right">RATE</div>
            <div className="col-span-2 font-bold text-center">QTY</div>
            <div className="col-span-2 font-bold text-right">AMOUNT</div>
          </div>

          {data.items.map((item, index) => (
            <div key={index} className="p-4 grid grid-cols-12 gap-4 border-b">
              <div className="col-span-6 font-bold">{item.name}</div>
              <div className="col-span-2 text-right">{item.rate}</div>
              <div className="col-span-2 text-center">{item.quantity}</div>
              <div className="col-span-2 text-right font-bold">{item.rate * item.quantity}</div>
            </div>
          ))}

          <div className="p-4 grid grid-cols-12 gap-4 bg-black text-white">
            <div className="col-span-10 font-bold text-xl">TOTAL</div>
            <div className="col-span-2 font-bold text-xl text-right">{totalAmount}</div>
          </div>
        </div>

        <div className="border-t pt-4">
          <h2 className="text-xl font-bold mb-4 uppercase">Notes</h2>
          <p>Thank you for your Business!</p>
        </div>
      </div>
    </div>
  )
}

