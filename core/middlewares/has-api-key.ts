import { HttpRequest } from "core/__domain/infra/http-request"
import {
  HttpResponse,
  ok,
  unauthorized,
} from "../../core/__domain/infra/http-response"
import { Middleware } from "../../core/__domain/infra/middleware"
import { Context } from "../../core/models/knex/context"
import { Logger } from "../../core/logger"

export class HasApiKeyMiddleware implements Middleware {
  private readonly logger = new Logger(HasApiKeyMiddleware.name)
  async handler(
    httpRequest: HttpRequest,
    _httpBody?: unknown,
  ): Promise<HttpResponse | false> {
    const _apiKey = httpRequest.apiKey
    const isValid = /^[a-zA-Z0-9]{9}-[a-f0-9]{64}$/.test(_apiKey || "")

    if (!_apiKey || !isValid) {
      this.logger.warn(
        `Try request with invalid api-key: [${httpRequest.apiKey}]`,
      )
      return unauthorized({ message: "Invalid or missing ApiKey" })
    }

    const context = new Context()

    const apiKey = await context.apikeys.findByKey(_apiKey)

    if (!apiKey) {
      this.logger.warn(
        `Try request with invalid api-key: [${httpRequest.apiKey}]`,
      )
      return unauthorized({ message: "Invalid or missing ApiKey" })
    }

    if (!apiKey.active) {
      this.logger.warn(
        `Try request with an api-key disabled: [${httpRequest.apiKey}]`,
      )
      return unauthorized({ message: "Invalid or missing ApiKey" })
    }

    return ok({ apiKey })
  }
}
