import { describe, it, expect, vi } from "vitest";
import { seedLocalizableDocument } from "./index";
import { createMockStrapi } from "../../tests/mocks/strapi";

describe("seedLocalizableDocument", () => {
  const uid = "api::test.test";
  const data = {
    es: { title: "Título ES", content: "Contenido" },
    en: { title: "Title EN", content: "Content" },
  };

  it("should skip seeding if ES document already exists", async () => {
    const { strapi, defaultService } = createMockStrapi({
      existingEsDoc: { documentId: "existing", id: 1 },
    });

    await seedLocalizableDocument(strapi as any, uid, data);

    expect(defaultService.create).not.toHaveBeenCalled();
    expect(defaultService.findFirst).toHaveBeenCalledTimes(1);
  });

  it("should create ES entry first, then EN with shared documentId", async () => {
    const { strapi, defaultService } = createMockStrapi({
      existingEsDoc: null,
      existingEnDoc: null,
      createResult: { documentId: "new-doc-id", id: 1 },
    });

    await seedLocalizableDocument(strapi as any, uid, data);

    expect(defaultService.findFirst).toHaveBeenCalledWith({ locale: "es" });
    expect(defaultService.create).toHaveBeenCalledTimes(2);

    const firstCallArg = defaultService.create.mock.calls[0][0];
    expect(firstCallArg.locale).toBe("es");
    expect(firstCallArg.data).toEqual(data.es);

    const secondCallArg = defaultService.create.mock.calls[1][0];
    expect(secondCallArg.locale).toBe("en");
    expect(secondCallArg.data.documentId).toBe("new-doc-id");
    expect(secondCallArg.data.title).toBe(data.en.title);
  });

  it("should handle empty data objects", async () => {
    const { strapi, defaultService } = createMockStrapi({
      existingEsDoc: null,
    });

    await seedLocalizableDocument(strapi as any, uid, {
      es: {},
      en: {},
    });

    expect(defaultService.create).toHaveBeenCalledTimes(2);
    expect(defaultService.create).toHaveBeenNthCalledWith(1, {
      locale: "es",
      data: {},
    });
    expect(defaultService.create).toHaveBeenNthCalledWith(2, {
      locale: "en",
      data: { documentId: "mock-doc-id" },
    });
  });

  it("should preserve non-overlapping fields between ES and EN", async () => {
    const { strapi, defaultService } = createMockStrapi({
      existingEsDoc: null,
      createResult: { documentId: "doc-123", id: 1 },
    });

    const customData = {
      es: { uniqueEsField: "solo-es", shared: "mismo" },
      en: { uniqueEnField: "solo-en", shared: "same" },
    };

    await seedLocalizableDocument(strapi as any, uid, customData);

    const esCall = defaultService.create.mock.calls[0][0];
    expect(esCall.data.uniqueEsField).toBe("solo-es");
    expect(esCall.data.shared).toBe("mismo");

    const enCall = defaultService.create.mock.calls[1][0];
    expect(enCall.data.uniqueEnField).toBe("solo-en");
    expect(enCall.data.shared).toBe("same");
    expect(enCall.data.documentId).toBe("doc-123");
  });

  it("should not mutate the original data objects", async () => {
    const { strapi } = createMockStrapi({
      existingEsDoc: null,
      createResult: { documentId: "doc-456", id: 1 },
    });

    const esData = { title: "Original ES" };
    const enData = { title: "Original EN" };

    await seedLocalizableDocument(strapi as any, uid, {
      es: esData,
      en: enData,
    });

    expect(esData).toEqual({ title: "Original ES" });
    expect(enData).toEqual({ title: "Original EN" });
  });
});
