import { IAccountModel } from "../../../../core/__domain/models/account.model"
import {
  CreateAccountBodyDto,
  CreateAccountResponseDto,
} from "../../../../core/__domain/dtos/account.dto"
import { BadRequestException } from "../../../../core/exceptions"
import { Account } from "../../../../core/__domain/entities/account.entity"

export class CreateAccountService {
  constructor(private readonly accountModel: IAccountModel) {}

  async execute({
    name,
    email,
  }: CreateAccountBodyDto): Promise<CreateAccountResponseDto> {
    const accountExists = await this.accountModel.findByEmail(email)

    if (accountExists) {
      throw new BadRequestException("Account already exists")
    }

    const apiKey = await this.accountModel.genApiKey()

    const account = Account.create({ name, email, APIKey: apiKey })

    await this.accountModel.save(account)

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
