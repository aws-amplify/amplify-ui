---
'@aws-amplify/ui-react-geo': major
---

feat(react-geo): upgrade to maplibre-gl v6 and react-map-gl v8

Upgrades `maplibre-gl` to `^6.4.1`, which fixes GHSA-jrc7-96c5-q579, `react-map-gl` to `8.1.3`, and `maplibre-gl-js-amplify` to `^5.0.0`, the first release that supports `maplibre-gl` v6.

**Breaking changes**

- `MapView` and `LocationSearch` now use `react-map-gl/maplibre`. Import `react-map-gl` components and hooks such as `Marker`, `Popup`, `useMap` and `MapRef` from `react-map-gl/maplibre` instead of `react-map-gl`.
- `maplibre-gl` v6 is ESM-only and requires WebGL2.
- `maplibre-gl` v6 loads its web worker from a separate file that bundlers do not emit. Pass the bundled worker URL to `MapView` with the new `workerUrl` property:

  ```jsx
  // Vite
  import workerUrl from 'maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url';

  <MapView workerUrl={workerUrl} />;
  ```

  For Next.js and webpack, copy `maplibre-gl/dist/maplibre-gl-worker.mjs` and `maplibre-gl/dist/maplibre-gl-shared.mjs` to your public directory and pass `workerUrl="/maplibre-gl-worker.mjs"`. See https://maplibre.org/maplibre-gl-js/docs/#installation for other bundlers.

- The Mapbox-only `fog` property is no longer accepted by `MapView`.
- `mapbox-gl` is no longer a dependency.
- Next.js 13 is not supported: its compiler produces a broken client bundle for `maplibre-gl` v6. Use Next.js 14 or later.

`maplibre-gl` and `maplibre-gl-js-amplify` are now loaded on the client when `MapView` or `LocationSearch` mounts, so `@aws-amplify/ui-react-geo` can still be imported in server-rendered pages.
