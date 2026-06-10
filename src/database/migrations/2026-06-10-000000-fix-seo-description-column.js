module.exports = {
  async up(knex) {
    await knex.schema.raw(
      `ALTER TABLE components_shared_seos ALTER COLUMN meta_description TYPE TEXT;`
    );
  },
};
