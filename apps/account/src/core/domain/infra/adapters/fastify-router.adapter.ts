import { FastifyReply, FastifyRequest } from "fastify"
import { Controller } from "../../../../../../../core/__domain/infra/controller"

export const adapterRoute = (controller: Controller) => {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const requestData = {
      body: request.body,
      params: request.params,
      query: request.query,
      apiKey: request.apiKey,
      userId: request.userId,
    }

    const httpResponse = await controller.handler(requestData)

    if (httpResponse.ok) {
      return reply.status(httpResponse.statusCode).send(httpResponse.body)
    }
    return reply.status(httpResponse.statusCode).send({
      error: httpResponse.body.error,
    })
  }
}
