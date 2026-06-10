module.exports = {
  async up(knex) {
    const isPG =
      knex.client.config.client === "pg" ||
      knex.client.config.client === "postgresql" ||
      knex.client.config.client === "postgres";

    if (isPG) {
      await knex.schema.raw(
        `ALTER TABLE components_shared_seos ALTER COLUMN meta_description TYPE TEXT;`
      );
      await knex.schema.raw(
        `ALTER TABLE components_shared_seos ADD COLUMN IF NOT EXISTS meta_image INTEGER NULL;`
      );
    } else {
      const hasCol = await knex.schema.hasColumn("components_shared_seos", "meta_image");
      if (!hasCol) {
        await knex.schema.raw(
          `ALTER TABLE components_shared_seos ADD COLUMN meta_image INTEGER NULL;`
        );
      }
    }
  },
};
