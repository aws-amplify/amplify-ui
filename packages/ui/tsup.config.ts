import { defineConfig } from 'tsup';

export default defineConfig({
  dts: true,
  entryPoints: ['src/index.ts'],
  format: ['cjs', 'esm'],
  // ! .cjs/.mjs doesn't work with Angular's webpack4 config by default!
  legacyOutput: true,
  sourcemap: true,
  splitting: false,
  minify: false,
  clean: false,
});
