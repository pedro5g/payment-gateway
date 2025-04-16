import { Status } from "../interfaces/invoice.interface"

export interface CreateInvoiceBodyDto {
  apiKey: string
  amount: number
  description: string | null
  paymentType: string
  cardNumber: string
  CVV: string
  expiryMonth: number
  expiryYear: number
  cardholderName: string
}

export interface CreateInvoiceResponseDto {
  id: string
  accountId: string
  amount: number
  status: string
  description: string | null
  paymentType: string
  cardLAstDigits: string
  createdAt: Date
  updatedAt: Date
}

export interface UpdateInvoiceStatusBodyDto {
  status: Status
}
