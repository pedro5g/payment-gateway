import { z } from "zod"
import { Logger } from "../logger"

export const envSchema = z.object({
  NODE_ENV: z.enum(["dev", "prod", "test"]).default("dev"),
  HOST: z.string().default("0.0.0.0"),
  ACCOUNT_SERVER_PORT: z.coerce.number().default(8000),
  GATEWAY_SERVER_PORT: z.coerce.number().default(8001),
  BASE_PATH: z.string().trim(),
  PG_DATABASE_HOST: z.string().trim().default("localhost"),
  PG_DATABASE_PORT: z.coerce.number(),
  PG_DATABASE_USERNAME: z.string().trim(),
  PG_DATABASE_PASSWORD: z.string().trim(),
  PG_DATABASE_NAME: z.string().trim(),
})

const _env = envSchema.safeParse(process.env)

if (!_env.success) {
  new Logger("Env").error(
    `Invalid environments variables ❌❌❌❌❌`,
    _env.error.flatten().fieldErrors,
  )
  throw new Error("Invalid environments variables")
}

export const env = _env.data
