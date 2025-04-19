import { Context } from "../../../../core/models/knex/context"
import {
  CreateInvoiceBodyDto,
  CreateInvoiceResponseDto,
} from "../../../../core/__domain/dtos/invoice.dto"
import { NotFoundException } from "../../../../core/exceptions"
import { Invoice } from "../../../../core/__domain/entities/invoice.entity"
import { Inject, Service } from "../core/domain/infra/decorators"
import { Status } from "../../../../core/__domain/interfaces/invoice.interface"

@Service()
export class CreateInvoiceService {
  constructor(@Inject(Context) private readonly context: Context) {}

  async execute({
    apiKey,
    amount,
    description,
    paymentType,
  }: CreateInvoiceBodyDto): Promise<CreateInvoiceResponseDto> {
    const account = await this.context.accounts.findByAPIKey(apiKey)

    if (!account) {
      throw new NotFoundException("Account not found")
    }

    const invoice = Invoice.create({
      accountId: account.id,
      amount,
      description,
      paymentType,
      status: Status.Pending,
    })

    await this.context.invoices.save(invoice)

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
