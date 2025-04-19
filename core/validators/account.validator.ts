import { z } from "zod"

const nameSchema = z.string().trim().min(3).max(255)
const emailSchema = z.string().trim().email()

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

export type UpdateWebhookSchemaType = z.infer<typeof updateWebhookSchema>
export type EnterInAccountSchemaType = z.infer<typeof enterInAccountSchema>
export type CreateAccountSchemaType = z.infer<typeof createAccountSchema>
