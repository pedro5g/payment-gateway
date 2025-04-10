import path from "node:path"
import { fileURLToPath } from "node:url"

const __filename = fileURLToPath(import.meta.filename)
const __dirname = path.dirname(__filename)

export { __dirname }
