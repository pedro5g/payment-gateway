import { HttpRequest } from "core/__domain/infra/http-request"
import {
  HttpResponse,
  ok,
  unauthorized,
} from "../../core/__domain/infra/http-response"
import { Middleware } from "../../core/__domain/infra/middleware"

export class HasApiKeyMiddleware implements Middleware {
  async handler(
    httpRequest: HttpRequest,
    _httpBody?: unknown,
  ): Promise<HttpResponse | false> {
    const apiKey = httpRequest.apiKey
    const isValid = /^[a-zA-Z0-9]{9}-[a-f0-9]{64}$/.test(apiKey || "")

    if (!apiKey || !isValid) {
      return unauthorized({ message: "Invalid or missing ApiKey" })
    }

    return ok({ apiKey })
  }
}
