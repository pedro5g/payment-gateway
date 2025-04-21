import { IApiKeyModel } from "core/__domain/models/api-key.model"
import { BaseModel } from "./base"
import { ApiKey } from "../../__domain/entities/api-key.entity"
import { DatabaseException } from "core/exceptions"
import { Tables } from "knex/types/tables"
import { genAPIKey } from "../../utils/gen-api-key"

export class ApiKeyModel extends BaseModel implements IApiKeyModel {
  async save(entity: ApiKey): Promise<void> {
    const [apiKey] = await this.knex("api_keys")
      .insert({
        id: entity.id,
        account_id: entity.accountId,
        key: entity.key,
        active: entity.active,
        created_at: entity.createdAt,
        updated_at: entity.updatedAt,
      })
      .returning("*")

    if (!apiKey || apiKey.id !== entity.id) {
      throw new DatabaseException("Failure on create apiKey")
    }
  }

  async update(entity: ApiKey): Promise<void> {
    const affectedRows = await this.knex("api_keys")
      .update({
        active: entity.active,
        updated_at: entity.updatedAt,
      })
      .where({ id: entity.id })

    if (affectedRows <= 0) {
      throw new DatabaseException(`Error on update apiKey with id ${entity.id}`)
    }
  }

  async listByAccountId(accountId: string): Promise<ApiKey[]> {
    const _apiKeys = await this.knex("api_keys").where({
      account_id: accountId,
    })

    return _apiKeys.map(this.toDomain)
  }

  async findById(id: string): Promise<ApiKey | null> {
    const apiKey = await this.knex("api_keys")
      .where({
        id,
      })
      .first()
    return apiKey ? this.toDomain(apiKey) : null
  }

  async findByKey(key: string): Promise<ApiKey | null> {
    const _apiKey = await this.knex("api_keys").where({ key }).first()

    return _apiKey ? this.toDomain(_apiKey) : null
  }

  async genApiKey(): Promise<string> {
    let apiKey: string
    let isUnique: boolean

    do {
      apiKey = genAPIKey()
      const existing = await this.knex("api_keys")
        .where({ key: apiKey })
        .first()
      isUnique = !!existing
    } while (isUnique)

    return apiKey
  }

  private toDomain(apiKey: Tables["api_keys"]) {
    return ApiKey.create({
      id: apiKey.id,
      accountId: apiKey.account_id,
      key: apiKey.key,
      active: apiKey.active,
      createdAt: apiKey.created_at,
      updatedAt: apiKey.updated_at,
    })
  }
}
