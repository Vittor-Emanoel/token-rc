import { defineConfig } from "tsup";

export default defineConfig({
  entry: [
    "src/**/*.{ts,tsx}",
    "!src/**/*.stories.{ts,tsx}",
    "tailwind.config.ts",
    "src/styles/index.css",
  ],
  outDir: "dist",
  minify: true,
  format: ["cjs", "esm"],
  sourcemap: false,
  clean: true,
  dts: true,
  tsconfig: "tsconfig.build.json",
});
