import { env } from "../../../core/env"
import { Logger } from "../../../core/logger"
import { app } from "./app"

app.listen(env.GATEWAY_SERVER_PORT, () => {
  new Logger("GatewayApp").info(
    `Gateway server is running at port ${env.GATEWAY_SERVER_PORT}`,
  )
})
