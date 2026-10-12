import type * as Maplibre from 'maplibre-gl';
import type * as MaplibreGlJsAmplify from 'maplibre-gl-js-amplify';

/**
 * `maplibre-gl@6` is ESM-only (no `require` export) and `maplibre-gl-js-amplify` imports it at module scope, so both
 * are loaded lazily on the client. This keeps `@aws-amplify/ui-react-geo` importable during server-side rendering.
 *
 * Each module is imported once and the promise is shared by every `MapView` and `LocationSearch`. A rejected import
 * (for example a stale chunk after a deploy, or a network failure) clears the cache, so a later mount can retry.
 */
let maplibrePromise: Promise<typeof Maplibre> | undefined;
let maplibreGlJsAmplifyPromise: Promise<typeof MaplibreGlJsAmplify> | undefined;

export const loadMaplibre = (): Promise<typeof Maplibre> =>
  (maplibrePromise ??= import('maplibre-gl').catch((error: unknown) => {
    maplibrePromise = undefined;
    throw error;
  }));

export const loadMaplibreGlJsAmplify = (): Promise<
  typeof MaplibreGlJsAmplify
> =>
  (maplibreGlJsAmplifyPromise ??= import('maplibre-gl-js-amplify').catch(
    (error: unknown) => {
      maplibreGlJsAmplifyPromise = undefined;
      throw error;
    }
  ));
