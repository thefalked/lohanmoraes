import path from "node:path";
import { fileURLToPath } from "node:url";

import { defineConfig } from "vite-plus";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";

const rootDir = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  staged: {
    "*": "vp check --fix",
  },
  fmt: {
    ignorePatterns: ["dist/**", "src/routeTree.gen.ts", "scripts/**"],
  },
  lint: {
    ignorePatterns: ["dist/**", "src/routeTree.gen.ts", "scripts/**"],
    jsPlugins: [{ name: "vite-plus", specifier: "vite-plus/oxlint-plugin" }],
    rules: { "vite-plus/prefer-vite-plus-imports": "error" },
    options: { typeAware: true, typeCheck: true },
    overrides: [
      {
        files: ["**/*.{test,spec}.{ts,tsx}"],
        rules: {
          "typescript/unbound-method": "off",
          "vite-plus/prefer-vite-plus-imports": "off",
        },
      },
      {
        files: ["src/test/**"],
        rules: {
          "vite-plus/prefer-vite-plus-imports": "off",
        },
      },
    ],
  },
  plugins: [
    tanstackRouter({
      target: "react",
      autoCodeSplitting: true,
    }),
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(rootDir, "./src"),
    },
  },
  test: {
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
    include: ["src/**/*.{test,spec}.{ts,tsx}"],
  },
});
