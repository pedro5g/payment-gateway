import {
  CreateAccountBodyDto,
  CreateAccountResponseDto,
} from "../../../../core/__domain/dtos/account.dto"
import { BadRequestException } from "../../../../core/exceptions"
import { Account } from "../../../../core/__domain/entities/account.entity"
import { Context } from "../../../../core/models/knex/context"
import { Inject, Service } from "../core/domain/infra/decorators"
import { ApiKey } from "core/__domain/entities/api-key.entity"

@Service()
export class CreateAccountService {
  constructor(@Inject(Context) private readonly context: Context) {}

  async execute({
    name,
    email,
  }: CreateAccountBodyDto): Promise<CreateAccountResponseDto> {
    const accountExists = await this.context.accounts.findByEmail(email)

    if (accountExists) {
      throw new BadRequestException("Account already exists")
    }

    const account = Account.create({ name, email })

    const apiKey = ApiKey.create({
      accountId: account.id,
      key: await this.context.apikeys.genApiKey(),
    })

    await this.context.transaction(async () => {
      await this.context.accounts.save(account)
      await this.context.apikeys.save(apiKey)
    })

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
