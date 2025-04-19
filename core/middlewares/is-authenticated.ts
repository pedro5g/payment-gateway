import { HttpRequest } from "core/__domain/infra/http-request"
import { HttpResponse, ok, unauthorized } from "../__domain/infra/http-response"
import { Middleware } from "core/__domain/infra/middleware"

export class IsAuthenticated implements Middleware {
  async handler(
    httpRequest: HttpRequest<{ user_id: string | undefined }>,
    _httpBody?: unknown,
  ): Promise<HttpResponse | false> {
    const user_id = httpRequest?.["user_id"]
    const isValid =
      /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i.test(
        user_id || "",
      )
    if (!user_id || !isValid) {
      return unauthorized({ message: "user_id is invalid or is missing" })
    }

    return ok({ userId: user_id })
  }
}
