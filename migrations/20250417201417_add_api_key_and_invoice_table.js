export async function up(knex) {
  await knex.raw(`
       ALTER TABLE accounts DROP COLUMN api_key;
       CREATE TABLE api_keys (
        id UUID CONSTRAINT pk_api_keys PRIMARY KEY DEFAULT(gen_random_uuid()),
        key TEXT NOT NULL CONSTRAINT up_api_keys_key UNIQUE,
        active BOOLEAN NOT NULL DEFAULT(true),
        created_at TIMESTAMP NOT NULL CONSTRAINT df_api_keys_created_at DEFAULT(now()),
        updated_at TIMESTAMP NOT NULL CONSTRAINT df_api_keys_updated_at DEFAULT(now())
       );
       ALTER TABLE api_keys ADD COLUMN account_id UUID NOT NULL;
       ALTER TABLE api_keys 
            ADD CONSTRAINT fk_api_keys_account_id 
                FOREIGN KEY (account_id) REFERENCES accounts (id); 
       
        CREATE TYPE invoice_status AS ENUM ('pending', 'approved', 'rejected');

        CREATE TABLE invoices (
          id UUID CONSTRAINT pk_invoices PRIMARY KEY DEFAULT(gen_random_uuid()),
          account_id UUID NOT NULL,
          amount BIGINT NOT NULL DEFAULT(0),
          status invoice_status NOT NULL CONSTRAINT df_invoices_status DEFAULT('pending'),
          description TEXT,
          payment_type VARCHAR(30) NOT NULL,
          created_at TIMESTAMP NOT NULL CONSTRAINT df_invoices_created_at DEFAULT(now()),
          updated_at TIMESTAMP NOT NULL CONSTRAINT df_invoices_updated_at DEFAULT(now())
        );

        ALTER TABLE invoices 
             ADD CONSTRAINT fk_invoices_account_id 
               FOREIGN KEY (account_id) REFERENCES accounts (id);
    `)
}

export async function down(knex) {
  await knex.raw(`
        DROP TABLE api_keys;
        DROP TABLE invoices;
        DROP TYPE invoice_status;
    `)
}
