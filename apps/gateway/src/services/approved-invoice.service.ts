import {
  ApprovedInvoiceBodyDto,
  ApprovedInvoiceResponseDto,
} from "../../../../core/__domain/dtos/gateway.dto"
import { Context } from "../../../../core/models/knex/context"
import { Inject, Service } from "../core/domain/infra/decorators"
import {
  BadRequestException,
  ForbiddenException,
  NotFoundException,
} from "../../../../core/exceptions"
import { Logger } from "../../../../core/logger"
import { Status } from "../../../../core/__domain/interfaces/invoice.interface"

@Service()
export class ApprovedInvoiceService {
  private readonly logger = new Logger(ApprovedInvoiceService.name)
  constructor(@Inject(Context) private readonly context: Context) {}

  async execute({
    key,
    invoiceId,
  }: ApprovedInvoiceBodyDto): Promise<ApprovedInvoiceResponseDto> {
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
      this.logger.warn(`Try to approved invoice with status ${invoice.status}`)
      throw new ForbiddenException(
        `You can't approved an invoice with status ${invoice.status}`,
      )
    }

    if (invoice.accountId !== account.id) {
      throw new ForbiddenException("You can only approve your own invoices")
    }

    await this.context.transaction(async () => {
      const hasBalance = account.balance - invoice.amount

      if (hasBalance < 0) {
        throw new BadRequestException("Insufficient balance")
      }
      account.removeBalance(invoice.amount)
      invoice.approvedInvoice()
      await this.context.accounts.updateBalance(account)
      await this.context.invoices.updateStatus(invoice)
    })

    return {}
  }
}
