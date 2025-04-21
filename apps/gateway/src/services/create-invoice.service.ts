import { Context } from "../../../../core/models/knex/context"
import {
  CreateInvoiceBodyDto,
  CreateInvoiceResponseDto,
} from "../../../../core/__domain/dtos/invoice.dto"
import {
  BadRequestException,
  NotFoundException,
} from "../../../../core/exceptions"
import { Invoice } from "../../../../core/__domain/entities/invoice.entity"
import { Inject, Service } from "../core/domain/infra/decorators"
import { Status } from "../../../../core/__domain/interfaces/invoice.interface"
import { Logger } from "../../../../core/logger"
import { PublishInWebhookService } from "../webhook/publish-in-webhook.service"

@Service()
export class CreateInvoiceService {
  private readonly logger = new Logger(CreateInvoiceService.name)
  constructor(
    @Inject(Context) private readonly context: Context,
    @Inject(PublishInWebhookService)
    private readonly publishInWebhookService: PublishInWebhookService,
  ) {}

  async execute({
    apiKey,
    amount,
    description,
    paymentType,
  }: CreateInvoiceBodyDto): Promise<CreateInvoiceResponseDto> {
    const account = await this.context.accounts.findByAPIKey(apiKey)

    if (!account) {
      this.logger.warn(`Account with api-key: [${apiKey}] not found`)
      throw new NotFoundException("Account not found")
    }

    const invoice = Invoice.create({
      accountId: account.id,
      amount,
      description,
      paymentType,
      status: Status.Pending,
    })

    await this.context.transaction(async () => {
      const hasBalance = account.balance - invoice.amount

      if (hasBalance < 0) {
        invoice.rejectedInvoice()
        await this.context.invoices.save(invoice)
        if (account.webhookUrl) {
          const res = await this.publishInWebhookService.execute({
            url: account.webhookUrl,
            body: {
              status: "error",
              details: "insufficient_balance",
              invoice: {
                id: invoice.id,
                accountId: invoice.id,
                amount: invoice.amount,
                status: invoice.status,
                paymentType: invoice.paymentType,
              },
            },
          })
          console.log(res)
        }

        throw new BadRequestException("Insufficient balance")
      }

      if (invoice.amount <= account.autoApproveLimit) {
        invoice.approvedInvoice()
        account.removeBalance(invoice.amount)
        if (account.webhookUrl) {
          const res = await this.publishInWebhookService.execute({
            url: account.webhookUrl,
            body: {
              status: "success",
              details: "auto_approve",
              invoice: {
                id: invoice.id,
                accountId: invoice.id,
                amount: invoice.amount,
                status: invoice.status,
                paymentType: invoice.paymentType,
              },
            },
          })
          console.log(res)
        }
      } else {
        if (account.webhookUrl) {
          const res = await this.publishInWebhookService.execute({
            url: account.webhookUrl,
            body: {
              status: "success",
              details: "waiting_manual_approval",
              invoice: {
                id: invoice.id,
                accountId: invoice.id,
                amount: invoice.amount,
                status: invoice.status,
                paymentType: invoice.paymentType,
              },
            },
          })
          console.log(res)
        }
      }
      await this.context.accounts.update(account)
      await this.context.invoices.save(invoice)
    })

    return {
      id: invoice.id,
      accountId: invoice.accountId,
      amount: invoice.amount,
      description: invoice.description,
      status: invoice.status,
      paymentType: invoice.paymentType,
      createdAt: invoice.createdAt,
      updatedAt: invoice.updatedAt,
    }
  }
}
