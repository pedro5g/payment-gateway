import { Middleware } from "../../../../../../../core/__domain/infra/middleware"
import { asyncHandler } from "./express-async-handler"

export const adapterMiddleware = (middleware: Middleware) => {
  return asyncHandler(async (req, res, next) => {
    const requestData = {
      apiKey: (req.headers?.["x-api-key"] as string | undefined) || "",
      userId: "",
      ...(req.headers || {}),
    }

    const httpResponse = await middleware.handler(requestData, req.body)

    if (httpResponse === false) {
      res.status(200).json()
      return
    }

    if (!httpResponse.ok && httpResponse.statusCode !== 200) {
      res.status(httpResponse.statusCode).json({
        error: httpResponse.body.error,
      })
      return
    }

    Object.assign(req, httpResponse.body)
    next()
  })
}
