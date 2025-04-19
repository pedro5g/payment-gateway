import { Context } from "../../../../core/models/knex/context"
import { Module } from "../core/domain/infra/decorators"
import { CreateAccountController } from "../controllers/create-account.controller"
import { GetAccountController } from "../controllers/get-account.controller"
import { EnterInAccountController } from "../controllers/enter-in-account.controller"
import { GetProfileController } from "../controllers/get-profile.controller"
import { DisableApiKeyController } from "../controllers/disable-api-key.controller"
import { ListAllApiKeyController } from "../controllers/list-all-api-key.controller"
import { CreateApiKeyController } from "../controllers/create-api-key.controller"
import { UpdateWebhookUrlController } from "../controllers/update-webhook-url.controller"

@Module({
  providers: [Context],
  controllers: [
    CreateAccountController,
    GetAccountController,
    EnterInAccountController,
    GetProfileController,
    CreateApiKeyController,
    DisableApiKeyController,
    ListAllApiKeyController,
    UpdateWebhookUrlController,
  ],
})
export class AccountModule {}
