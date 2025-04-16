import { fastify } from "fastify"
import { AccountModule } from "./modules/account.module"
import { env } from "../../../core/env"
import { adapterBindRoutes } from "./core/domain/infra/adapters/fastify-bind-routes.adapter"
import { GlobalErrorHandler } from "../../../core/middlewares/global-error-handler"
import { adapterErrorHandler } from "./core/domain/infra/adapters/fastify-error-handler.adapter"
import { ControllerInstance } from "../../../core/__domain/infra/controller"

const app = fastify({
  logger: {
    transport: {
      target: "pino-pretty",
      options: {
        translateTime: "HH:MM:ss Z",
      },
    },
    serializers: {
      req(req) {
        return {
          method: req.method,
          url: req.url,
          host: req.host,
          remoteAddress: req.ip,
          userAgent: req.headers["user-agent"],
        }
      },
      res(replay) {
        return {
          statusCode: replay.statusCode,
        }
      },
    },
  },
})

const accountModule = new AccountModule() as {
  controllers: ControllerInstance[]
}
const globalErrorHandler = new GlobalErrorHandler()
app.register(adapterBindRoutes(accountModule.controllers), {
  prefix: `${env.BASE_PATH}/account`,
})

app.setErrorHandler(adapterErrorHandler(globalErrorHandler))

export { app }
