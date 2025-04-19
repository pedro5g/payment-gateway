import { Context } from "../../../../core/models/knex/context"
import { Module } from "../core/domain/infra/decorators"
import { CreateInvoiceController } from "../controllers/create-invoice.controller"

@Module({
  providers: [Context],
  controllers: [CreateInvoiceController],
})
export class GateWayModule {}
