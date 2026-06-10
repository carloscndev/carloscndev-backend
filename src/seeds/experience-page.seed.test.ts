import { describe, it, expect, vi, beforeEach } from "vitest";
import { createMockStrapi } from "../../tests/mocks/strapi";

describe("experience-page.seed", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should skip seeding if ES document exists", async () => {
    const { strapi, defaultService } = createMockStrapi({
      existingEsDoc: { documentId: "exp-existing", id: 1 },
    });

    const { seedExperiencePage } = await import("./experience-page.seed");
    await seedExperiencePage(strapi as any);

    expect(defaultService.create).not.toHaveBeenCalled();
  });

  function makeMockService(overrides: Partial<ReturnType<typeof vi.fn>> = {}) {
    return {
      findFirst: vi.fn().mockResolvedValue(null),
      findMany: vi.fn().mockResolvedValue(overrides.findMany ?? []),
      create: vi.fn().mockResolvedValue(overrides.create ?? { documentId: "exp-doc", id: 1 }),
      update: vi.fn(),
      delete: vi.fn(),
    };
  }

  it("should link all jobs by documentId", async () => {
    const { strapi, setDocService } = createMockStrapi({
      existingEsDoc: null,
      existingDocs: [],
      createResult: { documentId: "exp-doc", id: 1 },
    });

    const mockJobsEs = [
      { documentId: "job-1", company: "C3 AI" },
      { documentId: "job-2", company: "Liverpool" },
      { documentId: "job-3", company: "Sngular" },
      { documentId: "job-4", company: "STC Metro" },
    ];
    const mockJobsEn = mockJobsEs.map((j) => ({ ...j }));

    const jobService = makeMockService({
      findMany: [
        ...mockJobsEs.map((j) => Promise.resolve(j)),
        ...mockJobsEn.map((j) => Promise.resolve(j)),
      ],
    });

    setDocService("api::job.job", {
      ...jobService,
      findMany: vi.fn().mockResolvedValueOnce(mockJobsEs).mockResolvedValueOnce(mockJobsEn),
    });

    const { seedExperiencePage } = await import("./experience-page.seed");
    await seedExperiencePage(strapi as any);

    const expDocService = strapi.documents("api::experience-page.experience-page");
    expect(expDocService.create).toHaveBeenCalledTimes(2);

    const esCall = expDocService.create.mock.calls[0][0];
    expect(esCall.locale).toBe("es");
    expect(esCall.data.jobs).toEqual(["job-1", "job-2", "job-3", "job-4"]);
    expect(esCall.data.title).toBe("Experiencia Profesional");

    const enCall = expDocService.create.mock.calls[1][0];
    expect(enCall.locale).toBe("en");
    expect(enCall.data.jobs).toEqual(["job-1", "job-2", "job-3", "job-4"]);
    expect(enCall.data.documentId).toBe("exp-doc");
    expect(enCall.data.title).toBe("Professional Experience");
  });

  it("should handle empty job lists gracefully", async () => {
    const { strapi, setDocService } = createMockStrapi({
      existingEsDoc: null,
      existingDocs: [],
      createResult: { documentId: "exp-empty", id: 1 },
    });

    setDocService("api::job.job", {
      ...makeMockService(),
      findMany: vi.fn().mockResolvedValue([]),
    });

    const { seedExperiencePage } = await import("./experience-page.seed");
    await seedExperiencePage(strapi as any);

    const expDocService = strapi.documents("api::experience-page.experience-page");
    expect(expDocService.create).toHaveBeenCalledTimes(2);
    expect(expDocService.create.mock.calls[0][0].data.jobs).toEqual([]);
  });
});
