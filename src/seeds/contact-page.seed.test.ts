import { describe, it, expect, vi } from "vitest";
import { createMockStrapi } from "../../tests/mocks/strapi";

vi.mock("./index", () => ({
  seedLocalizableDocument: vi.fn().mockResolvedValue(undefined),
}));

describe("contact-page.seed", () => {
  it("should call seedLocalizableDocument with correct UID", async () => {
    const { seedLocalizableDocument } = await import("./index");
    const { seedContactPage } = await import("./contact-page.seed");
    const { strapi } = createMockStrapi();

    await seedContactPage(strapi as any);

    expect(seedLocalizableDocument).toHaveBeenCalledWith(
      strapi,
      "api::contact-page.contact-page",
      expect.objectContaining({
        es: expect.objectContaining({ title: "Hablemos 👋" }),
        en: expect.objectContaining({ title: "Let's Talk 👋" }),
      })
    );
  });
});
