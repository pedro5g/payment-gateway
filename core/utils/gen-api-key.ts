import { randomBytes } from "node:crypto"

export function genAPIKey() {
  const timestamp = Date.now().toString(32)
  const randomPart = randomBytes(32).toString("hex")

  return `${timestamp}-${randomPart}`
}
