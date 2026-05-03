import { defineConfig } from "tsup";

/**
 * Per-file transpile (no bundling) so that:
 * - Output mirrors src/ structure → small import surface, tree-shakeable.
 * - "use client" directives at the top of each file are preserved verbatim.
 * - Consumers that already bundle (Next.js, Vite) can pick only what they import.
 */
export default defineConfig({
  entry: ["src/**/*.{ts,tsx}"],
  format: ["esm"],
  dts: { resolve: true },
  tsconfig: "./tsconfig.build.json",
  sourcemap: true,
  clean: true,
  outDir: "dist",
  bundle: false,
  splitting: false,
  target: "es2020",
  external: ["react", "react-dom", "motion", "motion/react"],
});
