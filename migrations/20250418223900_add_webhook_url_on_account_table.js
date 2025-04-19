export async function up(knex) {
  await knex.raw(`
        ALTER TABLE accounts 
            ADD COLUMN webhook_url TEXT;
    `)
}

export async function down(knex) {}
