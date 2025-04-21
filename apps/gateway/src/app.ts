import express from "express"
import { ControllerInstance } from "../../../core/__domain/infra/controller"
import { GlobalErrorHandler } from "../../../core/middlewares/global-error-handler"
import { GateWayModule } from "./modules/gateway.module"
import { adapterBindRoutes } from "./core/domain/infra/adapters/express-bind-routes.adapter"
import { adapterErrorHandler } from "./core/domain/infra/adapters/express-error-handler.adapter"
import { env } from "../../../core/env"
import { Logger } from "../../../core/logger"

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use((req, res, next) => {
  const logger = new Logger("App gateway on request")
  const { ip, method, url, headers } = req
  const id = new Date().getTime()

  let agtMsg = ""
  if (headers["user-agent"]) agtMsg += `_a=${headers["user-agent"]}`

  if (env.NODE_ENV !== "prod") {
    const msg = `[${ip}] {${method}} ${id} - Receiving ${url}`
    logger.info(`${msg}${agtMsg}`)
  }

  const started = new Date().getTime()

  res.on("finish", () => {
    const took = new Date().getTime() - started

    logger.info(
      `{req} [${ip}] ${method} ` +
        `${url}${agtMsg} : http=${res.statusCode} ${took}ms`,
    )
  })

  next()
})

const gatewayModule = new GateWayModule() as {
  controllers: ControllerInstance[]
}

const globalErrorHandler = new GlobalErrorHandler()
adapterBindRoutes(gatewayModule.controllers)(app)

app.use(adapterErrorHandler(globalErrorHandler))

export { app }
