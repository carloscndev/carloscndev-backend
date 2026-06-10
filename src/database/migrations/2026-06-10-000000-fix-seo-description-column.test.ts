import { describe, it, expect, vi, beforeEach } from "vitest";

// Migration logic extracted for testability
function getMigrationFn() {
  return {
    async up(knex: any) {
      const isPG =
        knex.client.config.client === "pg" ||
        knex.client.config.client === "postgresql" ||
        knex.client.config.client === "postgres";

      if (isPG) {
        await knex.schema.raw(
          "ALTER TABLE components_shared_seos ALTER COLUMN meta_description TYPE TEXT;"
        );
        await knex.schema.raw(
          "ALTER TABLE components_shared_seos ADD COLUMN IF NOT EXISTS meta_image INTEGER NULL;"
        );
      } else {
        const hasCol = await knex.schema.hasColumn("components_shared_seos", "meta_image");
        if (!hasCol) {
          await knex.schema.raw(
            "ALTER TABLE components_shared_seos ADD COLUMN meta_image INTEGER NULL;"
          );
        }
      }
    },
  };
}

function createMockKnex(client: string) {
  return {
    client: { config: { client } },
    schema: {
      raw: vi.fn().mockResolvedValue(undefined),
      hasColumn: vi.fn().mockResolvedValue(true),
    },
  };
}

describe("SEO description column migration", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should run ALTER COLUMN meta_description TYPE TEXT for PostgreSQL", async () => {
    const knex = createMockKnex("pg");
    const migration = getMigrationFn();
    await migration.up(knex);

    expect(knex.schema.raw).toHaveBeenCalledWith(
      "ALTER TABLE components_shared_seos ALTER COLUMN meta_description TYPE TEXT;"
    );
  });

  it("should add meta_image column for PostgreSQL with IF NOT EXISTS", async () => {
    const knex = createMockKnex("pg");
    const migration = getMigrationFn();
    await migration.up(knex);

    expect(knex.schema.raw).toHaveBeenCalledWith(
      "ALTER TABLE components_shared_seos ADD COLUMN IF NOT EXISTS meta_image INTEGER NULL;"
    );
  });

  it("should skip meta_description ALTER for SQLite", async () => {
    const knex = createMockKnex("sqlite3");
    const migration = getMigrationFn();
    knex.schema.hasColumn.mockResolvedValue(false);
    await migration.up(knex);

    expect(knex.schema.raw).not.toHaveBeenCalledWith(
      expect.stringContaining("ALTER COLUMN meta_description")
    );
  });

  it("should add meta_image column for SQLite if not already present", async () => {
    const knex = createMockKnex("sqlite3");
    const migration = getMigrationFn();
    knex.schema.hasColumn.mockResolvedValue(false);
    await migration.up(knex);

    expect(knex.schema.hasColumn).toHaveBeenCalledWith("components_shared_seos", "meta_image");
    expect(knex.schema.raw).toHaveBeenCalledWith(
      "ALTER TABLE components_shared_seos ADD COLUMN meta_image INTEGER NULL;"
    );
  });

  it("should skip adding meta_image column for SQLite if column already exists", async () => {
    const knex = createMockKnex("sqlite3");
    const migration = getMigrationFn();
    knex.schema.hasColumn.mockResolvedValue(true);
    await migration.up(knex);

    expect(knex.schema.raw).not.toHaveBeenCalledWith(
      expect.stringContaining("ADD COLUMN meta_image")
    );
  });

  it("should handle postgresql (full name) client config", async () => {
    const knex = createMockKnex("postgresql");
    const migration = getMigrationFn();
    await migration.up(knex);

    expect(knex.schema.raw).toHaveBeenCalledWith(
      "ALTER TABLE components_shared_seos ALTER COLUMN meta_description TYPE TEXT;"
    );
    expect(knex.schema.raw).toHaveBeenCalledWith(
      "ALTER TABLE components_shared_seos ADD COLUMN IF NOT EXISTS meta_image INTEGER NULL;"
    );
  });

  it("should handle postgres (short name) client config", async () => {
    const knex = createMockKnex("postgres");
    const migration = getMigrationFn();
    await migration.up(knex);

    expect(knex.schema.raw).toHaveBeenCalledWith(
      "ALTER TABLE components_shared_seos ALTER COLUMN meta_description TYPE TEXT;"
    );
  });
});
