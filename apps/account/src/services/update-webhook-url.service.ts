import { Context } from "../../../../core/models/knex/context"
import { Inject, Service } from "../core/domain/infra/decorators"
import {
  UpdateWebhookBodyDto,
  UpdateWebhookResponseDto,
} from "../../../../core/__domain/dtos/account.dto"
import { NotFoundException } from "../../../../core/exceptions"

@Service()
export class UpdateWebhookUrlService {
  constructor(@Inject(Context) private readonly context: Context) {}

  async execute({
    webhookUrl,
    accountId,
  }: UpdateWebhookBodyDto): Promise<UpdateWebhookResponseDto> {
    const account = await this.context.accounts.findById(accountId)

    if (!account) {
      throw new NotFoundException("Invalid account id, account not found")
    }
    account.webhookUrl = webhookUrl
    await this.context.accounts.update(account)
    return {}
  }
}
