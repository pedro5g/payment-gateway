import { Context } from "../../../../core/models/knex/context"
import {
  CreateApiKeyBodyDto,
  CreateApiKeyResponseDto,
} from "../../../../core/__domain/dtos/api-key.dto"
import { Inject, Service } from "../core/domain/infra/decorators"
import { ApiKey } from "../../../../core/__domain/entities/api-key.entity"
import { NotFoundException } from "core/exceptions"

@Service()
export class CreateApiKeyService {
  constructor(@Inject(Context) private readonly context: Context) {}

  async execute({
    accountId,
  }: CreateApiKeyBodyDto): Promise<CreateApiKeyResponseDto> {
    const account = await this.context.accounts.findById(accountId)

    if (!account) {
      throw new NotFoundException("Invalid id, account not found")
    }

    const _apiKey = await this.context.apikeys.genApiKey()

    const apiKey = ApiKey.create({ accountId, key: _apiKey })

    await this.context.apikeys.save(apiKey)

    return {
      apiKey: {
        id: apiKey.id,
        key: apiKey.key,
        accountId: apiKey.accountId,
        active: apiKey.active,
        createdAt: apiKey.createdAt,
        updatedAt: apiKey.updatedAt,
      },
    }
  }
}
