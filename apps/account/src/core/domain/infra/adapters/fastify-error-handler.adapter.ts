import { FastifyError, FastifyReply, FastifyRequest } from "fastify"
import { ErrorHandler } from "../../../../../../../core/__domain/infra/error-handler"

export const adapterErrorHandler = (errorHandler: ErrorHandler) => {
  return async (
    error: FastifyError,
    _request: FastifyRequest,
    reply: FastifyReply,
  ) => {
    const httpResponse = await errorHandler.handler(error)

    return reply.status(httpResponse.statusCode).send(httpResponse.body.error)
  }
}
