import { FastifyInstance } from "fastify"
import { CreateAccountController } from "../controllers/create-account.controller"

export class AccountRoute {
  constructor(private readonly controllers: [CreateAccountController]) {}

  build(app: FastifyInstance) {
    app.post("/register", this.controllers[0].handler.bind(this.controllers[0]))

    return app
  }
}
