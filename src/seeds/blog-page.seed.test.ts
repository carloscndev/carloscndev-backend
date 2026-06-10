import { describe, it, expect, vi } from "vitest";
import { createMockStrapi } from "../../tests/mocks/strapi";

vi.mock("./index", () => ({
  seedLocalizableDocument: vi.fn().mockResolvedValue(undefined),
}));

describe("blog-page.seed", () => {
  it("should call seedLocalizableDocument with correct UID", async () => {
    const { seedLocalizableDocument } = await import("./index");
    const { seedBlogPage } = await import("./blog-page.seed");
    const { strapi } = createMockStrapi();

    await seedBlogPage(strapi as any);

    expect(seedLocalizableDocument).toHaveBeenCalledWith(
      strapi,
      "api::blog-page.blog-page",
      expect.objectContaining({
        es: expect.objectContaining({ title: "Mi Blog" }),
        en: expect.objectContaining({ title: "My Blog" }),
      })
    );
  });
});
