import { defineConfig } from "eslint/config";
import globals from "globals";
import js from "@eslint/js";
import prettierPlugin from "eslint-plugin-prettier";

export default defineConfig([
  js.configs.recommended,
  {
    files: ["**/*.{js,ts}"],
    ignores: ["node_modules", "build", "dist"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.node,
      },
    },
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      semi: ["error", "always"],
      quotes: ["error", "double"],
      "prettier/prettier": ["error", { endOfLine: "auto" }],
    },
  },
]);
