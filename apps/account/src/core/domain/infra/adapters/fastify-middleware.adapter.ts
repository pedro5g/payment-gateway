import { FastifyReply, FastifyRequest } from "fastify"
import { Middleware } from "../../../../../../../core/__domain/infra/middleware"

export const adapterMiddleware = (middleware: Middleware) => {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const requestData = {
      apiKey: (request.headers?.["x-api-key"] as string | undefined) || "",
      userId: "",
      ...(request.headers || {}),
    }

    const httpResponse = await middleware.handler(requestData, request.body)

    if (httpResponse === false) {
      return reply.status(200).send()
    }

    if (!httpResponse.ok && httpResponse.statusCode !== 200) {
      return reply.status(httpResponse.statusCode).send({
        error: httpResponse.body.error,
      })
    }

    Object.assign(request, httpResponse.body)
  }
}
