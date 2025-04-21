import { Context } from "../../../../core/models/knex/context"
import { Inject, Service } from "../core/domain/infra/decorators"
import {
  UpdateAutoApproveLimitBodyDto,
  UpdateAutoApproveLimitResponseDto,
} from "../../../../core/__domain/dtos/account.dto"
import { NotFoundException } from "../../../../core/exceptions"

@Service()
export class UpdateAutoApproveLimitService {
  constructor(@Inject(Context) private readonly context: Context) {}

  async execute({
    accountId,
    limit,
  }: UpdateAutoApproveLimitBodyDto): Promise<UpdateAutoApproveLimitResponseDto> {
    const account = await this.context.accounts.findById(accountId)

    if (!account) {
      throw new NotFoundException("Invalid account id, account not found")
    }
    account.autoApproveLimit = limit
    await this.context.accounts.update(account)
    return {}
  }
}
