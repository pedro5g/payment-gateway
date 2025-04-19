import { Context } from "../../../../core/models/knex/context"
import {
  ListAllApiKeyBodyDto,
  ListAllApiKeyResponseDto,
} from "../../../../core/__domain/dtos/api-key.dto"
import { Inject, Service } from "../core/domain/infra/decorators"
import { NotFoundException } from "core/exceptions"

@Service()
export class ListAllApiKeysService {
  constructor(@Inject(Context) private readonly context: Context) {}

  async execute({
    accountId,
  }: ListAllApiKeyBodyDto): Promise<ListAllApiKeyResponseDto> {
    const account = await this.context.accounts.findById(accountId)

    if (!account) {
      throw new NotFoundException("Invalid id, account not found")
    }

    const apiKeys = await this.context.apikeys.listByAccountId(accountId)

    return {
      apiKeys: apiKeys.map((key) => ({
        id: key.id,
        key: key.key,
        active: key.active,
        accountId: key.accountId,
        createdAt: key.createdAt,
        updatedAt: key.updatedAt,
      })),
    }
  }
}
