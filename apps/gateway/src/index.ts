import { env } from "../../../core/env"
import { app } from "./app"

app.listen(env.GATEWAY_SERVER_PORT, () => {
  console.log(`Gateway server is running at port ${env.GATEWAY_SERVER_PORT}`)
})
