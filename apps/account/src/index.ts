import { env } from "../../../core/env"
import { Logger } from "../../../core/logger"
import { app } from "./app"

app
  .listen({
    host: env.HOST,
    port: env.ACCOUNT_SERVER_PORT,
  })
  .then(() => {
    new Logger("AccountApp").info(
      `Account server is running at port ${env.ACCOUNT_SERVER_PORT}`,
    )
  })
