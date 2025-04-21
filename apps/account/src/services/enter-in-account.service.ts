import { Context } from "../../../../core/models/knex/context"
import { Inject, Service } from "../core/domain/infra/decorators"
import {
  EnterInAccountBodyDto,
  EnterInAccountResponseDto,
} from "../../../../core/__domain/dtos/account.dto"
import { BadRequestException } from "../../../../core/exceptions"

@Service()
export class EnterInAccountService {
  constructor(@Inject(Context) private readonly context: Context) {}

  async execute({
    email,
  }: EnterInAccountBodyDto): Promise<EnterInAccountResponseDto> {
    const account = await this.context.accounts.findByEmail(email)

    if (!account) {
      throw new BadRequestException("You don't have an account, please sign up")
    }

    return {
      account: {
        id: account.id,
        name: account.name,
        email: account.email,
        balance: account.balance,
        autoApproveLimit: account.autoApproveLimit,
        apiKeys: account.apiKeys.map((key) => ({
          id: key.id,
          key: key.key,
          active: key.active,
          accountId: key.accountId,
          createdAt: key.createdAt,
          updatedAt: key.updatedAt,
        })),
        webhookUrl: account.webhookUrl,
        createdAt: account.createdAt,
        updatedAt: account.updatedAt,
      },
    }
  }
}
