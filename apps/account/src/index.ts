import { env } from "../../../core/env"
import { fastify } from "fastify"

const app = fastify({
  logger: {
    transport: {
      target: "pino-pretty",
      options: {
        translateTime: "HH:MM:ss Z",
      },
    },
  },
})

app.listen({
  host: env.HOST,
  port: env.PORT,
})
