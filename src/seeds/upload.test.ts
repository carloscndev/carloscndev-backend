import { describe, it, expect, vi, beforeEach } from "vitest";
import { createMockStrapi } from "../../tests/mocks/strapi";

const { mockExistsSync, mockStatSync, mockPathJoin } = vi.hoisted(() => ({
  mockExistsSync: vi.fn().mockReturnValue(true),
  mockStatSync: vi.fn().mockReturnValue({ size: 1024 }),
  mockPathJoin: vi.fn((...a: string[]) => a.join("/")),
}));

vi.mock("fs", () => ({
  existsSync: mockExistsSync,
  statSync: mockStatSync,
  default: {
    existsSync: mockExistsSync,
    statSync: mockStatSync,
  },
}));

vi.mock("path", () => ({
  join: mockPathJoin,
  default: {
    join: mockPathJoin,
  },
}));

describe("uploadFile", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockExistsSync.mockReturnValue(true);
    mockStatSync.mockReturnValue({ size: 1024 });
  });

  it("should upload a file successfully", async () => {
    const { strapi } = createMockStrapi();
    const uploadService = strapi.plugin("upload").service("upload");
    vi.mocked(uploadService.upload).mockResolvedValue({
      id: 42,
      url: "/uploads/test.webp",
    });

    const { uploadFile } = await import("./upload");
    const result = await uploadFile(strapi as any, "test.webp");

    expect(result).toEqual({ id: 42, url: "/uploads/test.webp" });
    expect(uploadService.upload).toHaveBeenCalledOnce();
  });

  it("should return null if file does not exist", async () => {
    mockExistsSync.mockReturnValue(false);
    const { strapi } = createMockStrapi();

    const { uploadFile } = await import("./upload");
    const result = await uploadFile(strapi as any, "missing.webp");

    expect(result).toBeNull();
  });

  it("should return the first element if upload returns an array", async () => {
    const { strapi } = createMockStrapi();
    const uploadService = strapi.plugin("upload").service("upload");
    vi.mocked(uploadService.upload).mockResolvedValue([
      { id: 1, url: "/uploads/a.webp" },
      { id: 2, url: "/uploads/b.webp" },
    ]);

    const { uploadFile } = await import("./upload");
    const result = await uploadFile(strapi as any, "multiple.webp");

    expect(result).toEqual({ id: 1, url: "/uploads/a.webp" });
  });
});
