import { z } from "zod"

const paymentTypeSchema = z.enum(["credit_card", "debit_card"])
const descriptionSchema = z.string().trim().nullable()
const amountSchema = z.number().positive()

export const createInvoiceSchema = z.object({
  paymentType: paymentTypeSchema,
  description: descriptionSchema,
  amount: amountSchema,
})

export type CreateInvoiceSchemaType = z.infer<typeof createInvoiceSchema>
