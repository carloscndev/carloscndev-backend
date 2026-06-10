import { describe, it, expect, vi } from "vitest";
import { createMockStrapi } from "../../tests/mocks/strapi";

vi.mock("./upload", () => ({
  uploadFile: vi.fn(),
}));

describe("home-page.seed", () => {
  it("should skip seeding if ES document exists", async () => {
    const { strapi } = createMockStrapi({
      existingEsDoc: { documentId: "existing", id: 1 },
    });

    const { seedHomePage } = await import("./home-page.seed");
    await seedHomePage(strapi as any);

    const homeService = strapi.documents("api::home-page.home-page");
    expect(homeService.create).not.toHaveBeenCalled();
  });

  it("should upload all avatars and create ES and EN entries", async () => {
    const { uploadFile } = await import("./upload");
    const { strapi, setDocService } = createMockStrapi({ existingEsDoc: null });

    vi.mocked(uploadFile)
      .mockResolvedValueOnce({ id: 10, url: "/uploads/hello.webp" })
      .mockResolvedValueOnce({ id: 11, url: "/uploads/running.webp" })
      .mockResolvedValueOnce({ id: 12, url: "/uploads/reading.webp" })
      .mockResolvedValueOnce({ id: 13, url: "/uploads/playing.webp" });

    const homeService = {
      findFirst: vi.fn().mockResolvedValue(null),
      create: vi
        .fn()
        .mockResolvedValueOnce({ documentId: "home-doc", id: 1 })
        .mockResolvedValueOnce({ documentId: "home-doc", id: 1 }),
    };
    setDocService("api::home-page.home-page", homeService);

    const { seedHomePage } = await import("./home-page.seed");
    await seedHomePage(strapi as any);

    expect(uploadFile).toHaveBeenCalledTimes(4);
    expect(uploadFile).toHaveBeenNthCalledWith(1, strapi, "hello.webp");
    expect(uploadFile).toHaveBeenNthCalledWith(2, strapi, "running.webp");
    expect(uploadFile).toHaveBeenNthCalledWith(3, strapi, "reading.webp");
    expect(uploadFile).toHaveBeenNthCalledWith(4, strapi, "playing.webp");

    expect(homeService.create).toHaveBeenCalledTimes(2);

    const esCall = homeService.create.mock.calls[0][0];
    expect(esCall.locale).toBe("es");
    expect(esCall.data.avatarDefault).toBe(10);
    expect(esCall.data.avatarRunning).toBe(11);
    expect(esCall.data.avatarReading).toBe(12);
    expect(esCall.data.avatarVideogames).toBe(13);

    const enCall = homeService.create.mock.calls[1][0];
    expect(enCall.locale).toBe("en");
    expect(enCall.data.documentId).toBe("home-doc");
    expect(enCall.data.avatarDefault).toBe(10);
  });

  it("should set null for avatars when upload fails", async () => {
    const { uploadFile } = await import("./upload");
    const { strapi, setDocService } = createMockStrapi({ existingEsDoc: null });

    vi.mocked(uploadFile).mockResolvedValue(null);

    const homeService = {
      findFirst: vi.fn().mockResolvedValue(null),
      create: vi
        .fn()
        .mockResolvedValueOnce({ documentId: "home-doc", id: 1 })
        .mockResolvedValueOnce({ documentId: "home-doc", id: 1 }),
    };
    setDocService("api::home-page.home-page", homeService);

    const { seedHomePage } = await import("./home-page.seed");
    await seedHomePage(strapi as any);

    const esCall = homeService.create.mock.calls[0][0];
    expect(esCall.data.avatarDefault).toBeNull();
    expect(esCall.data.avatarRunning).toBeNull();
  });
});
