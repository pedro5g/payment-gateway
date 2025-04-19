import { Status } from "../interfaces/invoice.interface"

export interface CreateInvoiceBodyDto {
  apiKey: string
  amount: number
  description: string | null
  paymentType: string
}

export interface CreateInvoiceResponseDto {
  id: string
  accountId: string
  amount: number
  status: string
  description: string | null
  paymentType: string
  createdAt: Date
  updatedAt: Date
}

export interface CreatePaymentBodyDto {
  invoiceId: string
  payerId: string
}

export interface UpdateInvoiceStatusBodyDto {
  status: Status
}
