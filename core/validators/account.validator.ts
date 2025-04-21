import { z } from "zod"

const nameSchema = z.string().trim().min(3).max(255)
const emailSchema = z.string().trim().email()
const amountSchema = z.number().int().positive()

export const createAccountSchema = z.object({
  name: nameSchema,
  email: emailSchema,
})

export const enterInAccountSchema = z.object({
  email: emailSchema,
})

export const updateWebhookSchema = z.object({
  webhookUrl: z.string().trim().url().nullable(),
})

export const updateAutoApproveLimitSchema = z.object({
  limit: amountSchema,
})

export const addBalanceSchema = z.object({
  balance: amountSchema,
})

export type UpdateWebhookSchemaType = z.infer<typeof updateWebhookSchema>
export type EnterInAccountSchemaType = z.infer<typeof enterInAccountSchema>
export type CreateAccountSchemaType = z.infer<typeof createAccountSchema>
