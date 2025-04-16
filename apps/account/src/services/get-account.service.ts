import { NotFoundException } from "../../../../core/exceptions"
import {
  GetAccountBodyDto,
  GetAccountResponseDto,
} from "../../../../core/__domain/dtos/account.dto"
import { Context } from "../../../../core/models/knex/context"
import { Inject, Service } from "../core/domain/infra/decorators"

@Service()
export class GetAccountService {
  constructor(@Inject(Context) private readonly context: Context) {}

  async execute({ apiKey }: GetAccountBodyDto): Promise<GetAccountResponseDto> {
    const account = await this.context.accounts.findByAPIKey(apiKey)

    if (!account) {
      throw new NotFoundException("Account not found")
    }

    return {
      id: account.id,
      name: account.name,
      email: account.email,
      balance: account.balance,
      APIKey: account.APIKey,
      createdAt: account.createdAt,
      updatedAt: account.updatedAt,
    }
  }
}
