import {
  CheckBalanceBodyDto,
  CheckBalanceResponseDto,
} from "../../../../core/__domain/dtos/gateway.dto"
import { Context } from "../../../../core/models/knex/context"
import { Inject, Service } from "../core/domain/infra/decorators"
import { NotFoundException } from "../../../../core/exceptions"
import { Logger } from "../../../../core/logger"

@Service()
export class CheckBalanceService {
  private readonly logger = new Logger(CheckBalanceService.name)
  constructor(@Inject(Context) private readonly context: Context) {}

  async execute({
    key,
  }: CheckBalanceBodyDto): Promise<CheckBalanceResponseDto> {
    const account = await this.context.accounts.findByAPIKey(key)

    if (!account) {
      this.logger.warn(`Account with api-key: [${key}] not found`)
      throw new NotFoundException("Account not found")
    }

    return { balance: account.balance }
  }
}
