import { FastifyInstance } from "fastify"
import { Context } from "../../../../core/models/knex/context"
import { CreateAccountService } from "../services/create-account.service"
import { CreateAccountController } from "../controllers/create-account.controller"
import { AccountRoute } from "../routes/account.route"
import { GetAccountService } from "../services/get-account.service"
import { GetAccountController } from "../controllers/get-account.controller"

export class AccountModule {
  static build(app: FastifyInstance) {
    const accountModel = new Context().accounts
    const createAccountService = new CreateAccountService(accountModel)
    const createAccountController = new CreateAccountController(
      createAccountService,
    )
    const getAccountService = new GetAccountService(accountModel)
    const getAccountController = new GetAccountController(getAccountService)

    const accountRoutes = new AccountRoute([
      createAccountController,
      getAccountController,
    ])

    return accountRoutes.bind(app)
  }
}
