import { Controller } from "../../../../../../../core/__domain/infra/controller"
import { asyncHandler } from "./express-async-handler"

export const adapterRoute = (controller: Controller) => {
  return asyncHandler(async (req, res) => {
    const requestData = {
      body: req.body,
      params: req.params,
      query: req.query,
      apiKey: req.apiKey,
      userId: req.userId,
    }

    const httpResponse = await controller.handler(requestData)

    if (httpResponse.ok) {
      res.status(httpResponse.statusCode).json(httpResponse.body)
    }
    res.status(httpResponse.statusCode).json({
      error: httpResponse.body.error,
    })
  })
}
