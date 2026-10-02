// maplibre-gl@6 loads its web worker from a separate file that Next.js does not emit, so serve it from `public/`.
// See https://maplibre.org/maplibre-gl-js/docs/#installation
import { copyFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const publicDir = join(dirname(fileURLToPath(import.meta.url)), '..', 'public');
const maplibreDist = dirname(
  require.resolve('maplibre-gl/dist/maplibre-gl-worker.mjs')
);

for (const file of ['maplibre-gl-worker.mjs', 'maplibre-gl-shared.mjs']) {
  copyFileSync(join(maplibreDist, file), join(publicDir, file));
}
