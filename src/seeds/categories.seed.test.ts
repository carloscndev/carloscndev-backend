import { describe, it, expect, vi } from "vitest";
import { createMockStrapi } from "../../tests/mocks/strapi";

describe("categories.seed", () => {
  it("should skip seeding if categories already exist", async () => {
    const { strapi } = createMockStrapi({ existingDocs: [{ documentId: "cat-1", id: 1 }] });

    const { seedCategories } = await import("./categories.seed");
    await seedCategories(strapi as any);

    const catService = strapi.documents("api::category.category");
    expect(catService.create).not.toHaveBeenCalled();
  });

  it("should create all 4 categories in both locales with shared documentIds", async () => {
    const { strapi, setDocService } = createMockStrapi({ existingDocs: [] });

    const catService = {
      findMany: vi.fn().mockResolvedValue([]),
      create: vi
        .fn()
        .mockResolvedValueOnce({ documentId: "cat-es-1", id: 1 })
        .mockResolvedValueOnce({ documentId: "cat-en-1", id: 2 })
        .mockResolvedValueOnce({ documentId: "cat-es-2", id: 3 })
        .mockResolvedValueOnce({ documentId: "cat-en-2", id: 4 })
        .mockResolvedValueOnce({ documentId: "cat-es-3", id: 5 })
        .mockResolvedValueOnce({ documentId: "cat-en-3", id: 6 })
        .mockResolvedValueOnce({ documentId: "cat-es-4", id: 7 })
        .mockResolvedValueOnce({ documentId: "cat-en-4", id: 8 }),
    };
    setDocService("api::category.category", catService);

    const { seedCategories } = await import("./categories.seed");
    await seedCategories(strapi as any);

    expect(catService.create).toHaveBeenCalledTimes(8);

    const esCall = catService.create.mock.calls[0][0];
    expect(esCall.locale).toBe("es");
    expect(esCall.data.name).toBe("Tecnología");
    expect(esCall.data.icon).toBe("TechIcon");

    const enCall = catService.create.mock.calls[1][0];
    expect(enCall.locale).toBe("en");
    expect(enCall.data.documentId).toBe("cat-es-1");
    expect(enCall.data.name).toBe("Tech");
    expect(enCall.data.icon).toBe("TechIcon");
  });

  it("should have correct category names and icons", async () => {
    const { strapi, setDocService } = createMockStrapi({ existingDocs: [] });

    const mockResults = Array.from({ length: 8 }, (_, i) => ({
      documentId: `cat-${i}`,
      id: i + 1,
    }));
    const createMock = vi.fn();
    for (const r of mockResults) {
      createMock.mockResolvedValueOnce(r);
    }
    setDocService("api::category.category", {
      findMany: vi.fn().mockResolvedValue([]),
      create: createMock,
    });

    const { seedCategories } = await import("./categories.seed");
    await seedCategories(strapi as any);

    const catService = strapi.documents("api::category.category");
    const expectedEsNames = ["Tecnología", "Running", "Viajes", "Libros"];
    const expectedEnNames = ["Tech", "Running", "Travel", "Books"];
    const expectedIcons = ["TechIcon", "RunningIcon", "TravelIcon", "BookIcon"];

    for (let i = 0; i < 4; i++) {
      const esIdx = i * 2;
      const enIdx = i * 2 + 1;

      expect(catService.create.mock.calls[esIdx][0].data.name).toBe(expectedEsNames[i]);
      expect(catService.create.mock.calls[enIdx][0].data.name).toBe(expectedEnNames[i]);
      expect(catService.create.mock.calls[esIdx][0].data.icon).toBe(expectedIcons[i]);
      expect(catService.create.mock.calls[enIdx][0].data.icon).toBe(expectedIcons[i]);
    }
  });
});
