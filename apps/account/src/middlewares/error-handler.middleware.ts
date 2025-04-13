import { AppError, DatabaseException } from "../../../../core/exceptions"
import { HTTP_STATUS } from "../../../../core/utils/http-status"
import { FastifyError, FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

const formatZodError = (reply: FastifyReply, error: z.ZodError) => {
  const errors = error.issues.map((err) => ({
    field: err.path.join("."),
    message: err.message,
  }))
  return reply.status(HTTP_STATUS.BAD_REQUEST).send({
    message: "Validation failed",
    errors,
  })
}

export const errorHandler = async (
  error: FastifyError,
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  if (error instanceof SyntaxError) {
    return reply.status(HTTP_STATUS.BAD_REQUEST).send({
      message: "Invalid Json format, please check your request body",
    })
  }

  if (error instanceof z.ZodError) {
    formatZodError(reply, error)
  }

  if (error instanceof DatabaseException) {
    request.log.warn(error, "Database exception")
    return reply.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send({
      message: "Internal Server Error",
      error: "Unknown error occurred",
    })
  }

  if (error instanceof AppError) {
    return reply.status(error.statusCode).send({
      message: error.message,
      errorCode: error.errorCode,
    })
  }

  return reply.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send({
    message: "Internal Server Error",
    error: error?.message || "Unknown error occurred",
  })
}
