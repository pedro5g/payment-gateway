import { FastifyInstance } from "fastify"
import { Context } from "../../../../core/models/knex/context"
import { CreateAccountService } from "../services/create-account.service"
import { CreateAccountController } from "../controllers/create-account.controller"
import { AccountRoute } from "../routes/account.route"

export class AccountModule {
  static build(app: FastifyInstance) {
    const accountModel = new Context().accounts
    const createAccountService = new CreateAccountService(accountModel)
    const createAccountController = new CreateAccountController(
      createAccountService,
    )
    const accountRoutes = new AccountRoute([createAccountController])

    return accountRoutes.build(app)
  }
}
