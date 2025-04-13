import { NotFoundException } from "../../../../core/exceptions"
import {
  GetAccountBodyDto,
  GetAccountResponseDto,
} from "../../../../core/__domain/dtos/account.dto"
import { IAccountModel } from "../../../../core/__domain/models/account.model"

export class GetAccountService {
  constructor(private readonly accountModel: IAccountModel) {}

  async execute({ apiKey }: GetAccountBodyDto): Promise<GetAccountResponseDto> {
    const account = await this.accountModel.findByAPIKey(apiKey)

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
