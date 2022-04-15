import { defineConfig } from 'tsup';

export default defineConfig({
  dts: true,
  entryPoints: ['src/index.ts'],
  // `aws-amplify` is external, but sub-dependencies weren't automatically externalized ("require" statements were included)
  external: ['`aws-amplify', /^@aws-amplify\//],
  format: ['cjs', 'esm'],
  // ! .cjs/.mjs doesn't work with Angular's webpack4 config by default!
  legacyOutput: true,
  sourcemap: true,
  splitting: false,
  minify: false,
  clean: false,
});
