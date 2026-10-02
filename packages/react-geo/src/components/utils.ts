import type * as Maplibre from 'maplibre-gl';
import type * as MaplibreGlJsAmplify from 'maplibre-gl-js-amplify';

/**
 * `maplibre-gl@6` is ESM-only (no `require` export) and `maplibre-gl-js-amplify` imports it at module scope, so both
 * are loaded lazily on the client. This keeps `@aws-amplify/ui-react-geo` importable during server-side rendering.
 */
let maplibrePromise: Promise<typeof Maplibre> | undefined;
let maplibreGlJsAmplifyPromise: Promise<typeof MaplibreGlJsAmplify> | undefined;

export const loadMaplibre = (): Promise<typeof Maplibre> =>
  (maplibrePromise ??= import('maplibre-gl'));

export const loadMaplibreGlJsAmplify = (): Promise<
  typeof MaplibreGlJsAmplify
> => (maplibreGlJsAmplifyPromise ??= import('maplibre-gl-js-amplify'));
