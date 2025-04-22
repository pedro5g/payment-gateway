import {
  RejectedInvoiceBodyDto,
  RejectedInvoiceResponseDto,
} from "../../../../core/__domain/dtos/gateway.dto"
import { Context } from "../../../../core/models/knex/context"
import { Inject, Service } from "../core/domain/infra/decorators"
import {
  ForbiddenException,
  NotFoundException,
} from "../../../../core/exceptions"
import { Logger } from "../../../../core/logger"
import { Status } from "../../../../core/__domain/interfaces/invoice.interface"

@Service()
export class RejectedInvoiceService {
  private readonly logger = new Logger(RejectedInvoiceService.name)
  constructor(@Inject(Context) private readonly context: Context) {}

  async execute({
    key,
    invoiceId,
  }: RejectedInvoiceBodyDto): Promise<RejectedInvoiceResponseDto> {
    const account = await this.context.accounts.findByAPIKey(key)

    if (!account) {
      this.logger.warn(`Account with api-key: [${key}] not found`)
      throw new NotFoundException("Account not found")
    }

    const invoice = await this.context.invoices.findById(invoiceId)

    if (!invoice) {
      this.logger.warn(`Invoice with id: [${invoiceId}] not found`)
      throw new NotFoundException("Invalid invoice id, invoice not found")
    }

    if (invoice.status !== Status.Pending) {
      this.logger.warn(`Try to Rejected invoice with status ${invoice.status}`)
      throw new ForbiddenException(
        `You can't Rejected an invoice with status ${invoice.status}`,
      )
    }

    if (invoice.accountId !== account.id) {
      throw new ForbiddenException("You can only reject your own invoices")
    }

    invoice.rejectedInvoice()
    await this.context.invoices.updateStatus(invoice)

    return {}
  }
}
