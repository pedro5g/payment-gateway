import { ErrorRequestHandler } from "express"
import { ErrorHandler } from "../../../../../../../core/__domain/infra/error-handler"

export const adapterErrorHandler = (
  errorHandler: ErrorHandler,
): ErrorRequestHandler => {
  return async (error, _request, response, _next) => {
    const httpResponse = await errorHandler.handler(error)
    response.status(httpResponse.statusCode).json(httpResponse.body.error)
  }
}
