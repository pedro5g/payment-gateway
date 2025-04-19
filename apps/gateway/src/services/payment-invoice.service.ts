import { Context } from "../../../../core/models/knex/context"
import { Inject, Service } from "../core/domain/infra/decorators"
import { CreatePaymentBodyDto } from "../../../../core/__domain/dtos/invoice.dto"
import {
  BadRequestException,
  NotFoundException,
} from "../../../../core/exceptions"

@Service()
export class PaymentInvoiceService {
  constructor(@Inject(Context) private readonly context: Context) {}

  async execute({ payerId, invoiceId }: CreatePaymentBodyDto) {
    const payer = await this.context.accounts.findById(payerId)

    if (!payer) {
      throw new NotFoundException("Account not found")
    }

    const invoice = await this.context.invoices.findById(invoiceId)

    if (!invoice) {
      throw new NotFoundException("Invoice not found")
    }

    const hasBalance = payer.balance - invoice.amount

    if (hasBalance < 0) {
      throw new BadRequestException("Insufficient balance")
    }

    await this.context.transaction(async () => {})
  }
}
