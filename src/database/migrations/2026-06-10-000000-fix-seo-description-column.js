module.exports = {
  async up(knex) {
    const client = knex.client.config.client;
    if (client === "pg" || client === "postgresql" || client === "postgres") {
      const hasTable = await knex.schema.hasTable("components_shared_seos");
      if (!hasTable) return;

      const { rows } = await knex.raw(
        `SELECT data_type, character_maximum_length FROM information_schema.columns
         WHERE table_name = 'components_shared_seos' AND column_name = 'meta_description'`
      );

      if (rows.length > 0 && rows[0].data_type === "character varying") {
        await knex.schema.raw(
          "ALTER TABLE components_shared_seos ALTER COLUMN meta_description TYPE TEXT;"
        );
        console.log("[migration] Changed meta_description to TEXT");
      }
    }
  },
};
