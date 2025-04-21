export interface CheckBalanceBodyDto {
  key: string
}

export interface CheckBalanceResponseDto {
  balance: number
}

export interface AddBalanceBodyDto {
  key: string
  amount: number
}

export interface AddBalanceResponseDto {}

export interface ApprovedInvoiceBodyDto {
  key: string
  invoiceId: string
}

export interface ApprovedInvoiceResponseDto {}

export interface RejectedInvoiceBodyDto {
  key: string
  invoiceId: string
}

export interface RejectedInvoiceResponseDto {}
