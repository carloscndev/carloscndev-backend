import { describe, it, expect, vi, beforeEach } from "vitest";
import { createMockStrapi } from "../tests/mocks/strapi";

vi.mock("./seeds/global-config.seed", () => ({
  seedGlobalConfig: vi.fn().mockResolvedValue(undefined),
}));
vi.mock("./seeds/home-page.seed", () => ({
  seedHomePage: vi.fn().mockResolvedValue(undefined),
}));
vi.mock("./seeds/about-page.seed", () => ({
  seedAboutPage: vi.fn().mockResolvedValue(undefined),
}));
vi.mock("./seeds/jobs.seed", () => ({
  seedJobs: vi.fn().mockResolvedValue(undefined),
}));
vi.mock("./seeds/experience-page.seed", () => ({
  seedExperiencePage: vi.fn().mockResolvedValue(undefined),
}));
vi.mock("./seeds/portfolio-page.seed", () => ({
  seedPortfolioPage: vi.fn().mockResolvedValue(undefined),
}));
vi.mock("./seeds/categories.seed", () => ({
  seedCategories: vi.fn().mockResolvedValue(undefined),
}));
vi.mock("./seeds/blog-page.seed", () => ({
  seedBlogPage: vi.fn().mockResolvedValue(undefined),
}));
vi.mock("./seeds/contact-page.seed", () => ({
  seedContactPage: vi.fn().mockResolvedValue(undefined),
}));
vi.mock("./seeds/error-page.seed", () => ({
  seedErrorPage: vi.fn().mockResolvedValue(undefined),
}));

describe("bootstrap", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should call all seed functions in sequence", async () => {
    const config = await import("./index");
    const { seedGlobalConfig } = await import("./seeds/global-config.seed");
    const { seedHomePage } = await import("./seeds/home-page.seed");
    const { seedAboutPage } = await import("./seeds/about-page.seed");
    const { seedJobs } = await import("./seeds/jobs.seed");
    const { seedExperiencePage } = await import("./seeds/experience-page.seed");
    const { seedPortfolioPage } = await import("./seeds/portfolio-page.seed");
    const { seedCategories } = await import("./seeds/categories.seed");
    const { seedBlogPage } = await import("./seeds/blog-page.seed");
    const { seedContactPage } = await import("./seeds/contact-page.seed");
    const { seedErrorPage } = await import("./seeds/error-page.seed");

    const { strapi } = createMockStrapi();

    await config.default.bootstrap({ strapi } as any);

    expect(seedGlobalConfig).toHaveBeenCalledWith(strapi);
    expect(seedHomePage).toHaveBeenCalledWith(strapi);
    expect(seedAboutPage).toHaveBeenCalledWith(strapi);
    expect(seedJobs).toHaveBeenCalledWith(strapi);
    expect(seedExperiencePage).toHaveBeenCalledWith(strapi);
    expect(seedPortfolioPage).toHaveBeenCalledWith(strapi);
    expect(seedCategories).toHaveBeenCalledWith(strapi);
    expect(seedBlogPage).toHaveBeenCalledWith(strapi);
    expect(seedContactPage).toHaveBeenCalledWith(strapi);
    expect(seedErrorPage).toHaveBeenCalledWith(strapi);
  });

  it("should not throw if all seeders succeed", async () => {
    const config = await import("./index");
    const { strapi } = createMockStrapi();

    await expect(config.default.bootstrap({ strapi } as any)).resolves.not.toThrow();
  });

  it("should not throw if a seeder fails (caught by try/catch)", async () => {
    const { seedGlobalConfig } = await import("./seeds/global-config.seed");
    vi.mocked(seedGlobalConfig).mockRejectedValueOnce(new Error("Seeder failed"));

    const config = await import("./index");
    const { strapi } = createMockStrapi();

    await expect(config.default.bootstrap({ strapi } as any)).resolves.not.toThrow();
  });

  it("should log success message when all seeds complete", async () => {
    const consoleSpy = vi.spyOn(console, "log");
    const config = await import("./index");
    const { strapi } = createMockStrapi();

    await config.default.bootstrap({ strapi } as any);

    const lastCall = consoleSpy.mock.calls[consoleSpy.mock.calls.length - 1];
    expect(lastCall[0]).toContain("All seed processes completed");
  });
});
