import { describe, it, expect, vi } from "vitest";
import { createMockStrapi } from "../../tests/mocks/strapi";

vi.mock("./upload", () => ({
  uploadFile: vi.fn(),
}));

describe("about-page.seed", () => {
  it("should skip seeding if ES document exists", async () => {
    const { strapi } = createMockStrapi({
      existingEsDoc: { documentId: "existing", id: 1 },
    });

    const { seedAboutPage } = await import("./about-page.seed");
    await seedAboutPage(strapi as any);

    const aboutService = strapi.documents("api::about-page.about-page");
    expect(aboutService.create).not.toHaveBeenCalled();
  });

  it("should upload image and create ES and EN entries", async () => {
    const { uploadFile } = await import("./upload");
    const { strapi, setDocService } = createMockStrapi({ existingEsDoc: null });

    vi.mocked(uploadFile).mockResolvedValue({ id: 20, url: "/uploads/working.webp" });

    const aboutService = {
      findFirst: vi.fn().mockResolvedValue(null),
      create: vi
        .fn()
        .mockResolvedValueOnce({ documentId: "about-doc", id: 1 })
        .mockResolvedValueOnce({ documentId: "about-doc", id: 1 }),
    };
    setDocService("api::about-page.about-page", aboutService);

    const { seedAboutPage } = await import("./about-page.seed");
    await seedAboutPage(strapi as any);

    expect(uploadFile).toHaveBeenCalledWith(strapi, "working.webp");
    expect(aboutService.create).toHaveBeenCalledTimes(2);

    const esCall = aboutService.create.mock.calls[0][0];
    expect(esCall.locale).toBe("es");
    expect(esCall.data.image).toBe(20);
    expect(esCall.data.title).toBe("Un poco sobre mi");

    const enCall = aboutService.create.mock.calls[1][0];
    expect(enCall.locale).toBe("en");
    expect(enCall.data.image).toBe(20);
    expect(enCall.data.documentId).toBe("about-doc");
    expect(enCall.data.title).toBe("A bit about me");
  });

  it("should set null for image when upload fails", async () => {
    const { uploadFile } = await import("./upload");
    const { strapi, setDocService } = createMockStrapi({ existingEsDoc: null });

    vi.mocked(uploadFile).mockResolvedValue(null);

    const aboutService = {
      findFirst: vi.fn().mockResolvedValue(null),
      create: vi
        .fn()
        .mockResolvedValueOnce({ documentId: "about-doc", id: 1 })
        .mockResolvedValueOnce({ documentId: "about-doc", id: 1 }),
    };
    setDocService("api::about-page.about-page", aboutService);

    const { seedAboutPage } = await import("./about-page.seed");
    await seedAboutPage(strapi as any);

    expect(aboutService.create.mock.calls[0][0].data.image).toBeNull();
  });

  it("should include technologies in both locales", async () => {
    const { uploadFile } = await import("./upload");
    const { strapi, setDocService } = createMockStrapi({ existingEsDoc: null });

    vi.mocked(uploadFile).mockResolvedValue({ id: 20, url: "/uploads/working.webp" });

    const aboutService = {
      findFirst: vi.fn().mockResolvedValue(null),
      create: vi
        .fn()
        .mockResolvedValueOnce({ documentId: "about-tech", id: 1 })
        .mockResolvedValueOnce({ documentId: "about-tech", id: 1 }),
    };
    setDocService("api::about-page.about-page", aboutService);

    const { seedAboutPage } = await import("./about-page.seed");
    await seedAboutPage(strapi as any);

    const esData = aboutService.create.mock.calls[0][0].data;
    expect(esData.technologies).toHaveLength(6);
    expect(esData.technologies[0].name).toBe("Ecosistema de React");

    const enData = aboutService.create.mock.calls[1][0].data;
    expect(enData.technologies).toHaveLength(6);
    expect(enData.technologies[0].name).toBe("React Ecosystem");
  });
});
