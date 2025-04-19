import { Context } from "../../../../core/models/knex/context"
import { Inject, Service } from "../core/domain/infra/decorators"
import {
  ProfileBodyDto,
  ProfileResponseDto,
} from "../../../../core/__domain/dtos/account.dto"
import { NotFoundException } from "../../../../core/exceptions"

@Service()
export class ProfileService {
  constructor(@Inject(Context) private readonly context: Context) {}

  async execute({ id }: ProfileBodyDto): Promise<ProfileResponseDto> {
    const account = await this.context.accounts.findById(id)

    if (!account) {
      throw new NotFoundException("Account not found")
    }

    return {
      account: {
        id: account.id,
        name: account.name,
        email: account.email,
        balance: account.balance,
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
