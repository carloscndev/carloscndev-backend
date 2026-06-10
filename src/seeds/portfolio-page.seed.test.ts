import { describe, it, expect, vi, beforeEach } from "vitest";
import { createMockStrapi } from "../../tests/mocks/strapi";

describe("portfolio-page.seed", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should skip seeding if ES document exists", async () => {
    const { strapi, defaultService } = createMockStrapi({
      existingEsDoc: { documentId: "portfolio-existing", id: 1 },
    });

    const { seedPortfolioPage } = await import("./portfolio-page.seed");
    await seedPortfolioPage(strapi as any);

    expect(defaultService.create).not.toHaveBeenCalled();
  });

  it("should link all projects by documentId", async () => {
    const { strapi, setDocService } = createMockStrapi({
      existingEsDoc: null,
      existingDocs: [],
      createResult: { documentId: "portfolio-doc", id: 1 },
    });

    const mockProjectsEs = [
      { documentId: "proj-1", title: "Proyecto 1" },
      { documentId: "proj-2", title: "Proyecto 2" },
    ];
    const mockProjectsEn = [
      { documentId: "proj-1", title: "Project 1" },
      { documentId: "proj-2", title: "Project 2" },
    ];

    setDocService("api::project.project", {
      findFirst: vi.fn().mockResolvedValue(null),
      findMany: vi.fn().mockResolvedValueOnce(mockProjectsEs).mockResolvedValueOnce(mockProjectsEn),
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    });

    const { seedPortfolioPage } = await import("./portfolio-page.seed");
    await seedPortfolioPage(strapi as any);

    const portDocService = strapi.documents("api::portfolio-page.portfolio-page");
    expect(portDocService.create).toHaveBeenCalledTimes(2);

    const esCall = portDocService.create.mock.calls[0][0];
    expect(esCall.locale).toBe("es");
    expect(esCall.data.projects).toEqual(["proj-1", "proj-2"]);
    expect(esCall.data.title).toBe("Mi Portafolio");

    const enCall = portDocService.create.mock.calls[1][0];
    expect(enCall.locale).toBe("en");
    expect(enCall.data.projects).toEqual(["proj-1", "proj-2"]);
    expect(enCall.data.documentId).toBe("portfolio-doc");
    expect(enCall.data.title).toBe("My Portfolio");
  });
});
