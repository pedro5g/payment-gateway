import { Context } from "../../../../core/models/knex/context"
import {
  CreateInvoiceBodyDto,
  CreateInvoiceResponseDto,
} from "../../../../core/__domain/dtos/invoice.dto"
import { NotFoundException } from "../../../../core/exceptions"
import { Invoice } from "../../../../core/__domain/entities/invoice.entity"

export class CreateInvoiceService {
  constructor(private readonly context: Context) {}

  async execute({
    apiKey,
    amount,
    cardNumber,
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
      cardLastDigits: cardNumber.slice(
        cardNumber.length - 4,
        cardNumber.length,
      ),
      description,
      paymentType,
    })

    await this.context.invoices.save(invoice)

    return {
      id: invoice.id,
      accountId: invoice.accountId,
      amount: invoice.amount,
      description: invoice.description,
      status: invoice.status,
      paymentType: invoice.paymentType,
      cardLAstDigits: invoice.cardLastDigits,
      createdAt: invoice.createdAt,
      updatedAt: invoice.updatedAt,
    }
  }
}
