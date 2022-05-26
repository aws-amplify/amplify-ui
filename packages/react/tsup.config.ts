import { defineConfig } from 'tsup';

export default defineConfig({
  dts: true,
  entryPoints: [
    'src/index.tsx',
    'src/legacy.tsx',
    'src/icons.tsx',
    'src/internal.tsx',
    'src/styles.ts',
  ],
  // `aws-amplify` is external, but sub-dependencies weren't automatically externalized ("require" statements were included)
  external: ['aws-amplify', /^@aws-amplify\//],
  format: ['cjs', 'esm'],
  inject: ['src/react-shim.js'],
  // ! .cjs/.mjs doesn't work with Angular's webpack4 config by default!
  legacyOutput: true,
  sourcemap: true,
  splitting: false,
  clean: false,
});
