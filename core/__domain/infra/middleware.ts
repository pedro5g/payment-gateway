import { HttpRequest } from "./http-request"
import { HttpResponse } from "./http-response"

export interface Middleware<
  R extends {} = {},
  T extends HttpRequest<R> = HttpRequest<R>,
  B = unknown,
> {
  handler(httpRequest: T, httpBody?: B): Promise<HttpResponse | false>
}
