// Global test setup for Vitest
// This file is loaded before each test file via the 'setup' option in vitest.config.ts

import { expect, vi } from "vitest";

// Mock console to reduce noise in tests
vi.spyOn(console, "log").mockImplementation(() => {});
vi.spyOn(console, "warn").mockImplementation(() => {});
vi.spyOn(console, "error").mockImplementation(() => {});

// Reset all mocks after each test
afterEach(() => {
  vi.restoreAllMocks();
});
