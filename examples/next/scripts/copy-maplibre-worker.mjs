// maplibre-gl@6 loads its web worker from a separate file that Next.js does not emit, so serve it from `public/`.
// See https://maplibre.org/maplibre-gl-js/docs/#installation
import { copyFileSync, existsSync, readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const publicDir = join(dirname(fileURLToPath(import.meta.url)), '..', 'public');
const maplibrePackageJson = require.resolve('maplibre-gl/package.json');
const maplibreDist = join(dirname(maplibrePackageJson), 'dist');
const { version: maplibreVersion } = JSON.parse(
  readFileSync(maplibrePackageJson, 'utf8')
);

for (const file of ['maplibre-gl-worker.mjs', 'maplibre-gl-shared.mjs']) {
  const source = join(maplibreDist, file);
  if (!existsSync(source)) {
    throw new Error(
      `copy-maplibre-worker: ${file} not found in maplibre-gl@${maplibreVersion} (${maplibreDist}). ` +
        'Check the maplibre-gl installation docs for the current worker file names.'
    );
  }
  copyFileSync(source, join(publicDir, file));
}
