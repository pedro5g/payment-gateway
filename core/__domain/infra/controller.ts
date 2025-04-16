import { HttpRequest } from "./http-request"
import { HttpResponse } from "./http-response"
import { Middleware } from "./middleware"

export type HTTP_METHODS = "GET" | "POST" | "DELETE" | "PUT" | "PATCH"
export type PATH = `/${string}`
export type MIDDLEWARES = (new () => Middleware)[]

export interface Controller<
  H extends object = {},
  T extends HttpRequest<H> = HttpRequest<H>,
> {
  handler(request: T): Promise<HttpResponse>
}

export interface ControllerInstance<
  H extends object = {},
  T extends HttpRequest<H> = HttpRequest<H>,
> {
  method: HTTP_METHODS
  path: PATH
  middlewares: MIDDLEWARES
  handler(request: T): Promise<HttpResponse>
}
