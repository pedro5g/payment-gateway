import { Context } from "../../../../core/models/knex/context"
import { Inject, Service } from "../core/domain/infra/decorators"
import {
  UpdateAddBalanceBodyDto,
  UpdateAddBalanceResponseDto,
} from "../../../../core/__domain/dtos/account.dto"
import { NotFoundException } from "../../../../core/exceptions"

@Service()
export class AddBalanceService {
  constructor(@Inject(Context) private readonly context: Context) {}

  async execute({
    accountId,
    balance,
  }: UpdateAddBalanceBodyDto): Promise<UpdateAddBalanceResponseDto> {
    const account = await this.context.accounts.findById(accountId)

    if (!account) {
      throw new NotFoundException("Invalid account id, account not found")
    }
    account.addBalance(balance)
    await this.context.accounts.updateBalance(account)
    return {}
  }
}
