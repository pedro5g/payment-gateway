import { FastifyInstance } from "fastify"
import { CreateAccountController } from "../controllers/create-account.controller"
import { hasApiKeyMiddleware } from "../middlewares/has-api-key.middleware"
import { GetAccountController } from "../controllers/get-account.controller"

export class AccountRoute {
  constructor(
    private readonly controllers: [
      CreateAccountController,
      GetAccountController,
    ],
  ) {}

  bind(app: FastifyInstance) {
    app.post("/register", this.controllers[0].handler.bind(this.controllers[0]))
    app.get(
      "/",
      { preHandler: [hasApiKeyMiddleware] },
      this.controllers[1].handler.bind(this.controllers[1]),
    )
    return app
  }
}
