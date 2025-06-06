import { ErrorCode, ErrorCodeType } from "../utils/error-code"
import { HTTP_STATUS, HttpStatusCode } from "../utils/http-status"

export class AppError extends Error {
  public statusCode: HttpStatusCode
  public errorCode?: ErrorCodeType

  constructor(
    message: string,
    statusCode: HttpStatusCode = HTTP_STATUS.INTERNAL_SERVER_ERROR,
    errorCode?: ErrorCodeType,
  ) {
    super(message)
    this.statusCode = statusCode
    this.errorCode = errorCode
    Error.captureStackTrace(this, this.constructor)
  }
}

export class NotFoundException extends AppError {
  constructor(message = "Resource Not Found", errorCode?: ErrorCodeType) {
    super(
      message,
      HTTP_STATUS.NOT_FOUND,
      errorCode || ErrorCode.RESOURCE_NOT_FOUND,
    )
  }
}

export class BadRequestException extends AppError {
  constructor(message = "Bad Request", errorCode?: ErrorCodeType) {
    super(message, HTTP_STATUS.BAD_REQUEST, errorCode || ErrorCode.BAD_REQUEST)
  }
}
export class UnauthorizedException extends AppError {
  constructor(message = "Unauthorized Access", errorCode?: ErrorCodeType) {
    super(
      message,
      HTTP_STATUS.UNAUTHORIZED,
      errorCode || ErrorCode.ACCESS_UNAUTHORIZED,
    )
  }
}
export class ForbiddenException extends AppError {
  constructor(message = "Operation Forbidden", errorCode?: ErrorCodeType) {
    super(
      message,
      HTTP_STATUS.FORBIDDEN,
      errorCode || ErrorCode.ACCESS_FORBIDDEN,
    )
  }
}
export class InternalServerException extends AppError {
  constructor(message = "Internal Server Error", errorCode?: ErrorCodeType) {
    super(
      message,
      HTTP_STATUS.INTERNAL_SERVER_ERROR,
      errorCode || ErrorCode.INTERNAL_SERVER_ERROR,
    )
  }
}
export class HttpException extends AppError {
  constructor(
    message = "Http Exception Error",
    statusCode: HttpStatusCode,
    errorCode?: ErrorCodeType,
  ) {
    super(message, statusCode, errorCode)
  }
}

export class DatabaseException extends AppError {
  constructor(message = "Database Exception Error", errorCode?: ErrorCodeType) {
    super(
      message,
      HTTP_STATUS.INTERNAL_SERVER_ERROR,
      errorCode || ErrorCode.DATABASE_ERROR,
    )
  }
}
