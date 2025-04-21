export async function up(knex) {
  await knex.raw(`
        ALTER TABLE accounts
            ADD COLUMN auto_approve_limit BIGINT 
                CONSTRAINT chk_accounts_auto_approve_limit CHECK (auto_approve_limit >= 0); 
    `)
}

export async function down(knex) {
  await knex.raw(`
        ALTER TABLE accounts 
            DROP COLUMN auto_approve_limit;
    `)
}
