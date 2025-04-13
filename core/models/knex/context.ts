import { Knex } from "knex"
import { db } from "../../db/knex"
import { IAccountModel } from "../../__domain/models/account.model"
import { AccountModel } from "./account.model"
import { BaseModel } from "./base"

export class Context {
  db: Knex
  accounts: IAccountModel

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
