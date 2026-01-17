import { defineConfig } from "eslint/config";
import globals from "globals";
import js from "@eslint/js";
import prettierPlugin from "eslint-plugin-prettier";
import tsParser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";

export default defineConfig([
  js.configs.recommended,
  {
    files: ["**/*.{js,ts,jsx,tsx}"],
    ignores: ["node_modules", "build", "dist", ".cache"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.node,
        strapi: "readonly",
      },
      parser: tsParser,
    },
    plugins: {
      prettier: prettierPlugin,
      "@typescript-eslint": tsPlugin,
    },
    rules: {
      semi: ["error", "always"],
      quotes: ["error", "double"],
      "prettier/prettier": ["error", { endOfLine: "auto" }],
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/no-explicit-any": "off",
    },
  },
]);
