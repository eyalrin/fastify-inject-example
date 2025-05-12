import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import json from "@eslint/json";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
    plugins: { js },
    extends: ["js/recommended"],
  },
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
    languageOptions: { globals: globals.node },
  },
  tseslint.configs.recommended,
  {
    files: ["**/*.ts"],
    rules: {
      "@typescript-eslint/no-empty-object-type": [
        "error",
        {
          allowInterfaces: "with-single-extends",
        },
      ],
    },
  },
  {
    files: ["**/*.json"],
    plugins: { json },
    language: "json/json",
    extends: ["json/recommended"],
    rules: {
      "json/no-empty-keys": "off",
    },
  },
  {
    files: ["**/launch.json", "**/tsconfig.json", "**/*.jsonc"], // Add tsconfig.json explicitly
    plugins: { json },
    language: "json/jsonc", // JSON with comments
    extends: ["json/recommended"],
  },
  {
    // Note: there should be no other properties in this object
    ignores: [
      "dist/**/*.d.ts",
      "dist/**/*.js",
      "dist/**/*.mjs",
      "dist/**/*.cjs",
    ],
  },
]);
