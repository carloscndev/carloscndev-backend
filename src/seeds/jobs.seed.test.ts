import { describe, it, expect, vi } from "vitest";
import { createMockStrapi } from "../../tests/mocks/strapi";

describe("jobs.seed", () => {
  it("should skip seeding if jobs already exist", async () => {
    const { strapi } = createMockStrapi({
      existingDocs: [
        { documentId: "job-1", id: 1 },
        { documentId: "job-2", id: 2 },
      ],
    });

    const { seedJobs } = await import("./jobs.seed");
    await seedJobs(strapi as any);

    const jobService = strapi.documents("api::job.job");
    expect(jobService.create).not.toHaveBeenCalled();
  });

  it("should create all 4 job entries in both locales with shared documentIds", async () => {
    const { strapi, setDocService } = createMockStrapi({ existingDocs: [] });

    const jobService = {
      findMany: vi.fn().mockResolvedValue([]),
      create: vi
        .fn()
        .mockResolvedValueOnce({ documentId: "job-es-1", id: 1 })
        .mockResolvedValueOnce({ documentId: "job-en-1", id: 2 })
        .mockResolvedValueOnce({ documentId: "job-es-2", id: 3 })
        .mockResolvedValueOnce({ documentId: "job-en-2", id: 4 })
        .mockResolvedValueOnce({ documentId: "job-es-3", id: 5 })
        .mockResolvedValueOnce({ documentId: "job-en-3", id: 6 })
        .mockResolvedValueOnce({ documentId: "job-es-4", id: 7 })
        .mockResolvedValueOnce({ documentId: "job-en-4", id: 8 }),
    };
    setDocService("api::job.job", jobService);

    const { seedJobs } = await import("./jobs.seed");
    await seedJobs(strapi as any);

    expect(jobService.create).toHaveBeenCalledTimes(8);

    const esCall1 = jobService.create.mock.calls[0][0];
    expect(esCall1.locale).toBe("es");
    expect(esCall1.data.company).toBe("C3 AI");

    const enCall1 = jobService.create.mock.calls[1][0];
    expect(enCall1.locale).toBe("en");
    expect(enCall1.data.documentId).toBe("job-es-1");
    expect(enCall1.data.role).toBe("Mid Software Engineer");

    const esCall4 = jobService.create.mock.calls[6][0];
    expect(esCall4.data.company).toBe("STC Metro");
  });

  it("should have sortOrder 0-3 for all entries", async () => {
    const { strapi, setDocService } = createMockStrapi({ existingDocs: [] });

    const mockResults = Array.from({ length: 8 }, (_, i) => ({
      documentId: `job-${i}`,
      id: i + 1,
    }));
    const createMock = vi.fn();
    for (const r of mockResults) {
      createMock.mockResolvedValueOnce(r);
    }
    setDocService("api::job.job", {
      findMany: vi.fn().mockResolvedValue([]),
      create: createMock,
    });

    const { seedJobs } = await import("./jobs.seed");
    await seedJobs(strapi as any);

    const jobService = strapi.documents("api::job.job");
    const esCalls = [0, 2, 4, 6].map((i) => jobService.create.mock.calls[i][0]);
    esCalls.forEach((call, idx) => {
      expect(call.locale).toBe("es");
      expect(call.data.sortOrder).toBe(idx);
    });
  });
});
