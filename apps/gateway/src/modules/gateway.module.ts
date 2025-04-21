import { Context } from "../../../../core/models/knex/context"
import { Module } from "../core/domain/infra/decorators"
import { CreateInvoiceController } from "../controllers/create-invoice.controller"
import { AddBalanceController } from "../controllers/add-balance.controller"
import { CheckBalanceController } from "../controllers/check-balance.controller"
import { GetAccountController } from "../controllers/get-account.controller"
import { ApprovedInvoiceController } from "../controllers/approved-invoice.controller"
import { RejectedInvoiceController } from "../controllers/rejected-invoice.controller"
import { PublishInWebhookService } from "../webhook/publish-in-webhook.service"

@Module({
  providers: [Context, PublishInWebhookService],
  controllers: [
    CreateInvoiceController,
    AddBalanceController,
    CheckBalanceController,
    GetAccountController,
    ApprovedInvoiceController,
    RejectedInvoiceController,
  ],
})
export class GateWayModule {}
