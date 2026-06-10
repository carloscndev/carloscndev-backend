/// <reference types="vitest" />

import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    setupFiles: ["./tests/setup.ts"],
    include: ["src/**/*.test.ts", "tests/**/*.test.ts"],
    exclude: ["**/node_modules/**", "**/dist/**", "**/build/**", "**/admin/**", "**/*.d.ts"],
    coverage: {
      provider: "v8",
      reporter: ["text", "lcov", "html"],
      include: ["src/seeds/**", "src/index.ts", "src/database/migrations/**", "tests/mocks/**"],
      exclude: ["**/*.d.ts", "src/seeds/data/**"],
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 80,
        statements: 80,
      },
    },
    reporters: ["default", "verbose"],
    pool: "forks",
    poolOptions: {
      threads: 1,
      forks: {
        singleFork: true,
      },
    },
    testTimeout: 10000,
  },
});
