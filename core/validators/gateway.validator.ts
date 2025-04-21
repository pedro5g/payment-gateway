import { z } from "zod"

const amountSchema = z.number().int().positive()
const idSchema = z.string().trim().uuid()

export const addBalanceSchema = z.object({
  amount: amountSchema,
})

export const approvedInvoiceSchema = z.object({
  invoiceId: idSchema,
})
export const rejectedInvoiceSchema = z.object({
  invoiceId: idSchema,
})
