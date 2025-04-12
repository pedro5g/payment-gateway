export async function up(knex) {
  await knex.raw(`
      CREATE TABLE accounts (
        id UUID NOT NULL CONSTRAINT pk_accounts PRIMARY KEY DEFAULT(gen_random_uuid()),
        name VARCHAR(255) NOT NULL,
        email TEXT NOT NULL CONSTRAINT uq_accounts_email UNIQUE,
        api_key TEXT NOT NULL CONSTRAINT uq_accounts_api_key UNIQUE,
        balance BIGINT NOT NULL DEFAULT(0), 
        created_at TIMESTAMP NOT NULL CONSTRAINT df_accounts_created_at DEFAULT(now()),
        updated_at TIMESTAMP NOT NULL CONSTRAINT df_accounts_updated_at DEFAULT(now())
        );  

        ALTER TABLE accounts ADD CONSTRAINT chk_accounts_balance CHECK (balance >= 0);
    `)
}

export async function down(knex) {
  await knex.raw(`
    DROP CONSTRAINT chk_accounts_balance;
    DROP TABLE accounts;
  `)
}
