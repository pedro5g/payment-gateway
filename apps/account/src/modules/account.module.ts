import { Context } from "../../../../core/models/knex/context"
import { Module } from "../core/domain/infra/decorators"
import { CreateAccountController } from "../controllers/create-account.controller"
import { GetAccountController } from "../controllers/get-account.controller"

@Module({
  providers: [Context],
  controllers: [CreateAccountController, GetAccountController],
})
export class AccountModule {}
