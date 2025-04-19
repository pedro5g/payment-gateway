import {
  clientError,
  HttpResponse,
  fail,
  notFound,
  unauthorized,
  conflict,
  tooMany,
  forbidden,
} from "../../core/__domain/infra/http-response"
import { ErrorHandler } from "../../core/__domain/infra/error-handler"
import { z } from "zod"
import { AppError, DatabaseException } from "../../core/exceptions"
import { HTTP_STATUS } from "../../core/utils/http-status"

export class GlobalErrorHandler implements ErrorHandler {
  async handler(httpError: object): Promise<HttpResponse> {
    if (httpError instanceof SyntaxError) {
      return clientError({
        message: "Invalid Json format, please check your request body",
      })
    }

    if (httpError instanceof z.ZodError) {
      const errors = httpError.issues.map((err) => ({
        field: err.path.join("."),
        message: err.message,
      }))

      return clientError({
        message: "Validation failed",
        errors,
      })
    }

    if (httpError instanceof DatabaseException) {
      return fail({
        message: "Internal Server Error",
        error: "Unknown error occurred",
      })
    }

    if (httpError instanceof AppError) {
      switch (httpError.statusCode) {
        case HTTP_STATUS.BAD_REQUEST:
          return clientError({
            message: httpError.message,
            errorCode: httpError.errorCode,
          })
        case HTTP_STATUS.NOT_FOUND:
          return notFound({
            message: httpError.message,
            errorCode: httpError.errorCode,
          })
        case HTTP_STATUS.UNAUTHORIZED:
          return unauthorized({
            message: httpError.message,
            errorCode: httpError.errorCode,
          })
        case HTTP_STATUS.FORBIDDEN:
          return forbidden({
            message: httpError.message,
            errorCode: httpError.errorCode,
          })
        case HTTP_STATUS.CONFLICT:
          return conflict({
            message: httpError.message,
            errorCode: httpError.errorCode,
          })
        case HTTP_STATUS.TOO_MANY_REQUESTS:
          return tooMany({
            message: httpError.message,
            errorCode: httpError.errorCode,
          })
      }
    }

    return fail({
      message: "Internal Server Error",
      error:
        "message" in httpError ? httpError.message : "Unknown error occurred",
    })
  }
}
