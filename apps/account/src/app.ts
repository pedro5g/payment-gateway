import { fastify } from "fastify"
import { AccountModule } from "./modules/account.module"
import { env } from "../../../core/env"
import { adapterBindRoutes } from "./core/domain/infra/adapters/fastify-bind-routes.adapter"
import { GlobalErrorHandler } from "../../../core/middlewares/global-error-handler"
import { adapterErrorHandler } from "./core/domain/infra/adapters/fastify-error-handler.adapter"
import { ControllerInstance } from "../../../core/__domain/infra/controller"
import { Logger } from "../../../core/logger"

const app = fastify()

const accountModule = new AccountModule() as {
  controllers: ControllerInstance[]
}
app.addHook("preHandler", (req, reply, next) => {
  const logger = new Logger("App account on request")
  const { ip, method, url, headers } = req
  const id = new Date().getTime()

  let agtMsg = ""
  if (headers["user-agent"]) agtMsg += `_a=${headers["user-agent"]}`

  if (env.NODE_ENV !== "prod") {
    const msg = `[${ip}] {${method}} ${id} - Receiving ${url}`
    logger.info(`${msg}${agtMsg}`)
  }

  const started = new Date().getTime()

  reply.raw.on("finish", () => {
    const took = new Date().getTime() - started

    logger.info(
      `{req} [${ip}] ${method} ` +
        `${url}${agtMsg} : http=${reply.statusCode} ${took}ms`,
    )
  })
  next()
})

const globalErrorHandler = new GlobalErrorHandler()
app.register(adapterBindRoutes(accountModule.controllers), {
  prefix: `${env.BASE_PATH}/account`,
})

app.setErrorHandler(adapterErrorHandler(globalErrorHandler))

export { app }
