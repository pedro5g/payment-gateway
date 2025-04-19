import { Context } from "../../../../core/models/knex/context"
import {
  DisableApiKeyBodyDto,
  DisableApiKeyResponseDto,
} from "../../../../core/__domain/dtos/api-key.dto"
import { Inject, Service } from "../core/domain/infra/decorators"
import {
  BadRequestException,
  NotFoundException,
  UnauthorizedException,
} from "../../../../core/exceptions"

@Service()
export class DisableApiKeyService {
  constructor(@Inject(Context) private readonly context: Context) {}

  async execute({
    id,
    accountId,
  }: DisableApiKeyBodyDto): Promise<DisableApiKeyResponseDto> {
    const apiKey = await this.context.apikeys.findById(id)

    if (!apiKey) {
      throw new NotFoundException("Invalid id, apiKey not found")
    }

    if (!apiKey.active) {
      throw new BadRequestException("This api key already disable")
    }

    if (apiKey.accountId !== accountId) {
      throw new UnauthorizedException("You don't have permission to do this")
    }

    apiKey.disable()
    await this.context.apikeys.update(apiKey)

    return {}
  }
}
