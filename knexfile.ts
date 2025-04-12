import { env } from "./core/env"
import type { Knex } from "knex"

const config = {
  client: "pg",
  connection: {
    host: env.PG_DATABASE_HOST,
    port: env.PG_DATABASE_PORT,
    database: env.PG_DATABASE_NAME,
    user: env.PG_DATABASE_USERNAME,
    password: env.PG_DATABASE_PASSWORD,
  },
  migrations: {
    directory: "./migrations",
  },
} satisfies Knex.Config

export default config
export { config }
