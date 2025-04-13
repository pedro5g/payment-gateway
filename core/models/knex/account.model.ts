import { Tables } from "knex/types/tables"
import { Account } from "../../__domain/entities/account.entity"
import { IAccountModel } from "../../__domain/models/account.model"
import { BaseModel } from "./base"
import { genAPIKey } from "../../utils/gen-api-key"
import { DatabaseException } from "../../../core/exceptions"

export class AccountModel extends BaseModel implements IAccountModel {
  async save(entity: Account): Promise<void> {
    const [account] = await this.knex("accounts")
      .insert({
        id: entity.id,
        name: entity.name,
        email: entity.email,
        api_key: entity.APIKey,
        balance: entity.balance,
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
    const account = await this.knex
      .select("*")
      .from("accounts")
      .where({
        email,
      })
      .first()

    return account ? this.toDomain(account) : null
  }

  async findByAPIKey(apiKey: string): Promise<Account | null> {
    const account = await this.knex
      .select("*")
      .from("accounts")
      .where({
        api_key: apiKey,
      })
      .first()

    return account ? this.toDomain(account) : null
  }

  async findById(id: string): Promise<Account | null> {
    const account = await this.knex
      .select("*")
      .from("accounts")
      .where({
        id,
      })
      .first()

    return account ? this.toDomain(account) : null
  }
  async genApiKey(): Promise<string> {
    let apiKey: string
    let isUnique: boolean

    do {
      apiKey = genAPIKey()
      const existing = await this.knex("accounts")
        .where({ api_key: apiKey })
        .first()
      isUnique = !!existing
    } while (isUnique)

    return apiKey
  }

  private toDomain(account: Tables["accounts"]) {
    return Account.create({
      id: account.id,
      name: account.name,
      email: account.email,
      APIKey: account.api_key,
      balance: parseInt(account.balance.toString()),
      createdAt: account.created_at,
      updatedAt: account.updated_at,
    })
  }
}
