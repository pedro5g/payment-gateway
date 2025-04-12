import { Knex } from "knex"
import { db } from "../../db/knex"
import { IAccountRepository } from "../../__domain/repositories/account.repository"
import { AccountModel } from "./account.model"
import { BaseModel } from "./base"

export class Context {
  db: Knex
  accounts: IAccountRepository

  constructor() {
    this.db = db
    this.accounts = new AccountModel(this)
  }

  async knexTransaction(fn: Function, callback?: (error: unknown) => void) {
    try {
      await this.db.transaction(async (trx) => {
        for (const key in this) {
          if (this[key] instanceof BaseModel) {
            this[key].knex = trx
          }
        }

        await fn()
      })
    } catch (e) {
      if (callback) {
        callback(e)
      } else {
        throw e
      }
    } finally {
      for (const key in this) {
        if (this[key] instanceof BaseModel) {
          this[key].knex = this.db
        }
      }
    }
  }
}
