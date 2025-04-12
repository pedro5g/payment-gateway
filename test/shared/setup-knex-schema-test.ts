import Knex from "knex"
import knexConfig from "../../knexfile"
import { randomUUID } from "node:crypto"

export async function setupKnexSchemaTest() {
  const schemaId = `test_${randomUUID().replace(/-/g, "")}`
  const knex = Knex({
    ...knexConfig,
    searchPath: [schemaId],
  })

  await knex.raw(`CREATE SCHEMA IF NOT EXISTS "${schemaId}"`)
  await knex.raw(`SET search_path TO "${schemaId}"`)
  await knex.migrate.up()

  return {
    db: knex,
    schemaId,
    async teardown() {
      await knex.destroy()

      const adminDb = Knex(knexConfig)

      await adminDb.raw(`DROP SCHEMA IF EXISTS "${schemaId}" CASCADE`)
      await adminDb.destroy()
    },
  }
}
