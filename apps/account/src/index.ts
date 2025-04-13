import { env } from "../../../core/env"
import { fastify } from "fastify"
import { AccountModule } from "./modules/account.module"
import { errorHandler } from "./middlewares/error-handler.middleware"

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

app.register(AccountModule.build, { prefix: `${env.BASE_PATH}/account` })
app.setErrorHandler(errorHandler)

app.listen({
  host: env.HOST,
  port: env.PORT,
})
