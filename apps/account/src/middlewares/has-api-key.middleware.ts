import { HTTP_STATUS } from "../../../../core/utils/http-status"
import { FastifyReply, FastifyRequest } from "fastify"

export const hasApiKeyMiddleware = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const apiKey = request.headers?.["x-api-key"] as string | undefined
  const isValid = /^[a-zA-Z0-9]{9}-[a-f0-9]{64}$/.test(apiKey || "")

  if (!apiKey || !isValid) {
    return reply
      .status(HTTP_STATUS.UNAUTHORIZED)
      .send({ message: "Invalid or missing ApiKey" })
  }

  request.apiKey = apiKey
}
