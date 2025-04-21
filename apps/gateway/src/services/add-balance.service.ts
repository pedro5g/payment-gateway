import {
  AddBalanceBodyDto,
  AddBalanceResponseDto,
} from "../../../../core/__domain/dtos/gateway.dto"
import { Context } from "../../../../core/models/knex/context"
import { Inject, Service } from "../core/domain/infra/decorators"
import { NotFoundException } from "../../../../core/exceptions"
import { Logger } from "../../../../core/logger"

@Service()
export class AddBalanceService {
  private readonly logger = new Logger(AddBalanceService.name)
  constructor(@Inject(Context) private readonly context: Context) {}

  async execute({
    key,
    amount,
  }: AddBalanceBodyDto): Promise<AddBalanceResponseDto> {
    const account = await this.context.accounts.findByAPIKey(key)

    if (!account) {
      this.logger.warn(`Account with api-key: [${key}] not found`)
      throw new NotFoundException("Account not found")
    }

    account.addBalance(amount)
    await this.context.accounts.updateBalance(account)

    return {}
  }
}
