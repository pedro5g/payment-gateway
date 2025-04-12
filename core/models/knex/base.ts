import { Knex } from "knex"
import { Context } from "./context"

export abstract class BaseModel {
  context: Context
  knex: Knex

  constructor(ctx: Context) {
    this.context = ctx
    this.knex = ctx.db
  }
}
