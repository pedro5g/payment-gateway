import { Tables } from "knex/types/tables"
import { Account } from "../../__domain/entities/account.entity"
import { IAccountModel } from "../../__domain/models/account.model"
import { BaseModel } from "./base"
import { DatabaseException } from "../../../core/exceptions"
import { ApiKey } from "core/__domain/entities/api-key.entity"

export class AccountModel extends BaseModel implements IAccountModel {
  async save(entity: Account): Promise<void> {
    const [account] = await this.knex("accounts")
      .insert({
        id: entity.id,
        name: entity.name,
        email: entity.email,
        balance: entity.balance,
        webhook_url: entity.webhookUrl,
        auto_approve_limit: entity.autoApproveLimit,
        created_at: entity.createdAt,
        updated_at: entity.updatedAt,
      })
      .returning("*")

    if (!account || account.id !== entity.id) {
      throw new DatabaseException("Failure on create account")
    }
  }

  async update(entity: Account): Promise<void> {
    const rowsAffected = await this.knex("accounts")
      .update({
        name: entity.name,
        webhook_url: entity.webhookUrl,
        auto_approve_limit: entity.autoApproveLimit,
        updated_at: entity.updatedAt,
      })
      .where({
        id: entity.id,
      })

    if (rowsAffected <= 0) {
      throw new DatabaseException(
        `Error on update account with id ${entity.id}`,
      )
    }
  }

  async updateBalance(entity: Account): Promise<void> {
    await this.knex.transaction(async (trx) => {
      const account = await trx("accounts")
        .where({
          id: entity.id,
        })
        .forUpdate() //  line locked for updating
        .first()

      if (!account) {
        throw new DatabaseException(`Account: ${entity.id} not found`)
      }

      const rowsAffected = await trx("accounts")
        .update({
          balance: entity.balance,
          updated_at: entity.updatedAt,
        })
        .where({
          id: entity.id,
        })

      if (rowsAffected <= 0) {
        throw new DatabaseException(
          `Error on update account with id ${entity.id}`,
        )
      }
    })
  }

  async delete(id: string): Promise<void> {
    await this.knex("accounts").where("accounts.id", "=", id).del()
  }

  async findByEmail(email: string): Promise<Account | null> {
    const result = await this.knex.raw(
      `
            SELECT
            a.*,
            COALESCE(
            JSON_AGG(
                JSON_BUILD_OBJECT(
                'id', k.id,
                'account_id', k.account_id,
                'key', k.key,
                'active', k.active,
                'created_at', k.created_at,
                'updated_at', k.updated_at
                )
            ) FILTER (WHERE k.id IS NOT NULL), '[]'
            ) AS api_keys
        FROM accounts a
        LEFT JOIN api_keys k ON a.id = k.account_id
        WHERE a.email = ?
        GROUP BY a.id
    `,
      [email],
    )
    const _account = result.rows[0]
    return _account ? this.toDomain(_account) : null
  }

  async findByAPIKey(apiKey: string): Promise<Account | null> {
    const _apiKey = await this.knex("api_keys").where({ key: apiKey }).first()

    if (!_apiKey) return null
    const account = await this.knex("accounts")
      .select("*")
      .where({ id: _apiKey.account_id })
      .first()

    return account ? this.toDomain(account) : null
  }

  async findById(id: string): Promise<Account | null> {
    const result = await this.knex.raw(
      `
            SELECT
            a.*,
            COALESCE(
            JSON_AGG(
                JSON_BUILD_OBJECT(
                'id', k.id,
                'account_id', k.account_id,
                'key', k.key,
                'active', k.active,
                'created_at', k.created_at,
                'updated_at', k.updated_at
                )
            ) FILTER (WHERE k.id IS NOT NULL), '[]'
            ) AS api_keys
        FROM accounts a
        LEFT JOIN api_keys k ON a.id = k.account_id
        WHERE a.id = ?
        GROUP BY a.id
    `,
      [id],
    )
    const _account = result.rows[0]
    return _account ? this.toDomain(_account) : null
  }

  private toDomain(account: Tables["accounts"]) {
    return Account.create({
      id: account.id,
      name: account.name,
      email: account.email,
      autoApproveLimit: account.auto_approve_limit,
      webhookUrl: account.webhook_url,
      apiKeys: account.api_keys
        ? account.api_keys.map((apiKey) => {
            return ApiKey.create({
              id: apiKey.id,
              key: apiKey.key,
              active: apiKey.active,
              accountId: apiKey.account_id,
              createdAt: apiKey.created_at,
              updatedAt: apiKey.updated_at,
            })
          })
        : [],
      balance: parseInt(account.balance.toString()),
      createdAt: account.created_at,
      updatedAt: account.updated_at,
    })
  }
}
