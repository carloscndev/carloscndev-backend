import { describe, it, expect, vi } from "vitest";
import { createMockStrapi } from "../../tests/mocks/strapi";

vi.mock("./upload", () => ({
  uploadFile: vi.fn(),
}));

describe("error-page.seed", () => {
  it("should skip seeding if ES document exists", async () => {
    const { strapi } = createMockStrapi({
      existingEsDoc: { documentId: "error-existing", id: 1 },
    });

    const { seedErrorPage } = await import("./error-page.seed");
    await seedErrorPage(strapi as any);

    const errorService = strapi.documents("api::error-page.error-page");
    expect(errorService.create).not.toHaveBeenCalled();
  });

  it("should upload sleeping image and create ES and EN entries", async () => {
    const { uploadFile } = await import("./upload");
    const { strapi, setDocService } = createMockStrapi({ existingEsDoc: null });

    vi.mocked(uploadFile).mockResolvedValue({
      id: 30,
      url: "/uploads/slepping.webp",
    });

    const errorService = {
      findFirst: vi.fn().mockResolvedValue(null),
      create: vi
        .fn()
        .mockResolvedValueOnce({ documentId: "error-doc", id: 1 })
        .mockResolvedValueOnce({ documentId: "error-doc", id: 1 }),
    };
    setDocService("api::error-page.error-page", errorService);

    const { seedErrorPage } = await import("./error-page.seed");
    await seedErrorPage(strapi as any);

    expect(uploadFile).toHaveBeenCalledWith(strapi, "slepping.webp");
    expect(errorService.create).toHaveBeenCalledTimes(2);

    const esCall = errorService.create.mock.calls[0][0];
    expect(esCall.locale).toBe("es");
    expect(esCall.data.image).toBe(30);
    expect(esCall.data.title).toBe("¡Ups! Tú no deberías estar aquí.");

    const enCall = errorService.create.mock.calls[1][0];
    expect(enCall.locale).toBe("en");
    expect(enCall.data.image).toBe(30);
    expect(enCall.data.documentId).toBe("error-doc");
    expect(enCall.data.title).toBe("Oops! You shouldn't be here.");
  });

  it("should set null for image when upload fails", async () => {
    const { uploadFile } = await import("./upload");
    const { strapi, setDocService } = createMockStrapi({ existingEsDoc: null });

    vi.mocked(uploadFile).mockResolvedValue(null);

    const errorService = {
      findFirst: vi.fn().mockResolvedValue(null),
      create: vi
        .fn()
        .mockResolvedValueOnce({ documentId: "error-doc", id: 1 })
        .mockResolvedValueOnce({ documentId: "error-doc", id: 1 }),
    };
    setDocService("api::error-page.error-page", errorService);

    const { seedErrorPage } = await import("./error-page.seed");
    await seedErrorPage(strapi as any);

    expect(errorService.create.mock.calls[0][0].data.image).toBeNull();
  });
});
