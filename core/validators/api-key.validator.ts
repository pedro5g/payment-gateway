import { z } from "zod"

const uuidSchema = z.string().trim().uuid({ message: "Invalid id format" })

export const disableApiKeySchema = z.object({
  apiKeyId: uuidSchema,
})
