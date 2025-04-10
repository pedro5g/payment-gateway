import { config } from "../../knexfile"
import Knex from "knex"

const db = Knex(config)

export { db }
