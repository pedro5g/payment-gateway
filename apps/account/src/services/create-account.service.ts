import {
  CreateAccountBodyDto,
  CreateAccountResponseDto,
} from "../../../../core/__domain/dtos/account.dto"
import { BadRequestException } from "../../../../core/exceptions"
import { Account } from "../../../../core/__domain/entities/account.entity"
import { Context } from "../../../../core/models/knex/context"
import { Inject, Service } from "../core/domain/infra/decorators"

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

    const apiKey = await this.context.accounts.genApiKey()

    const account = Account.create({ name, email, APIKey: apiKey })

    await this.context.accounts.save(account)

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
