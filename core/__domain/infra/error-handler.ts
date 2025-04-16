import { HttpResponse } from "./http-response"

export interface ErrorHandler<T = object> {
  handler(httpError: T): Promise<HttpResponse> | HttpResponse
}
