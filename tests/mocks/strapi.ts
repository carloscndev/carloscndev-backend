import { vi } from "vitest";

type DocumentService = {
  findFirst: ReturnType<typeof vi.fn>;
  findMany: ReturnType<typeof vi.fn>;
  create: ReturnType<typeof vi.fn>;
  update: ReturnType<typeof vi.fn>;
  delete: ReturnType<typeof vi.fn>;
};

function makeDocService(options?: {
  existingEsDoc?: Record<string, any> | null;
  existingEnDoc?: Record<string, any> | null;
  existingDocs?: Record<string, any>[];
  createResult?: Record<string, any>;
}) {
  return {
    findFirst: vi.fn().mockImplementation(({ locale }: { locale?: string } = {}) => {
      if (locale === "en") return Promise.resolve(options?.existingEnDoc ?? null);
      return Promise.resolve(options?.existingEsDoc ?? null);
    }),
    findMany: vi.fn().mockResolvedValue(options?.existingDocs ?? []),
    create: vi
      .fn()
      .mockResolvedValue(options?.createResult ?? { documentId: "mock-doc-id", id: 1 }),
    update: vi.fn().mockResolvedValue({ documentId: "mock-doc-id", id: 1 }),
    delete: vi.fn().mockResolvedValue({}),
  };
}

export function createMockStrapi(options?: {
  existingEsDoc?: Record<string, any> | null;
  existingEnDoc?: Record<string, any> | null;
  existingDocs?: Record<string, any>[];
  createResult?: Record<string, any>;
}) {
  const serviceMap = new Map<string, DocumentService>();

  const documents = vi.fn().mockImplementation((uid: string) => {
    if (!serviceMap.has(uid)) {
      serviceMap.set(uid, makeDocService(options));
    }
    return serviceMap.get(uid)!;
  });

  const setDocService = (uid: string, service: DocumentService) => {
    serviceMap.set(uid, service);
  };

  const mockStrapi = {
    documents,
    plugin: vi.fn().mockReturnValue({
      service: vi.fn().mockReturnValue({
        upload: vi.fn().mockResolvedValue({ id: 1, url: "/uploads/test.webp" }),
      }),
    }),
    db: {
      query: vi.fn().mockReturnValue({
        findOne: vi.fn(),
        create: vi.fn(),
        update: vi.fn(),
        delete: vi.fn(),
        load: vi.fn(),
      }),
    },
    getModel: vi.fn().mockReturnValue({
      attributes: {},
      options: {},
    }),
    config: { get: vi.fn() },
    contentTypes: {},
    components: {},
    plugins: {},
  };

  // Return a default doc service for the "first" call (backward compat)
  const defaultService = makeDocService(options);
  serviceMap.set("api::test.test", defaultService);

  return {
    strapi: mockStrapi,
    get defaultService() {
      return defaultService;
    },
    setDocService,
  };
}
