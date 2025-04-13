import { z } from "zod"

const nameSchema = z.string().trim().min(3).max(255)

export const createAccountSchema = z.object({
  name: nameSchema,
  email: z.string().trim().email(),
})

export type CreateAccountSchemaType = z.infer<typeof createAccountSchema>
