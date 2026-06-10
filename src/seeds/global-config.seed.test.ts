import { describe, it, expect, vi } from "vitest";
import { createMockStrapi } from "../../tests/mocks/strapi";

vi.mock("./index", () => ({
  seedLocalizableDocument: vi.fn().mockResolvedValue(undefined),
}));

describe("global-config.seed", () => {
  it("should call seedLocalizableDocument with correct UID", async () => {
    const { seedLocalizableDocument } = await import("./index");
    const { seedGlobalConfig } = await import("./global-config.seed");
    const { strapi } = createMockStrapi();

    await seedGlobalConfig(strapi as any);

    expect(seedLocalizableDocument).toHaveBeenCalledWith(
      strapi,
      "api::global-config.global-config",
      expect.objectContaining({
        es: expect.objectContaining({ siteName: "Carlos Castañeda" }),
        en: expect.objectContaining({ siteName: "Carlos Castañeda" }),
      })
    );
  });
});
