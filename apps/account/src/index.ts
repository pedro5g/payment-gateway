import { env } from "../../../core/env"
import { app } from "./app"

app.listen({
  host: env.HOST,
  port: env.ACCOUNT_SERVER_PORT,
})
