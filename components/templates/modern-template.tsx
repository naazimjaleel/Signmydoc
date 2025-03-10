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
    // Your template JSX
  )
} 