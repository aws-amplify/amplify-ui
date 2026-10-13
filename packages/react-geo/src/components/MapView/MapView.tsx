import React, { forwardRef, useEffect, useMemo, useState } from 'react';
import type { ResourcesConfig } from 'aws-amplify';
import { Amplify } from 'aws-amplify';
import { fetchAuthSession } from 'aws-amplify/auth';
import type * as maplibregl from 'maplibre-gl';
import ReactMapGL from 'react-map-gl/maplibre';
import type { MapProps, MapRef } from 'react-map-gl/maplibre';

import { loadMaplibre, loadMaplibreGlJsAmplify } from '../utils';

interface GeoConfig extends NonNullable<ResourcesConfig['Geo']> {}

type TransformRequestFunction = NonNullable<MapProps['transformRequest']>;

interface MapViewProps extends Omit<MapProps, 'mapLib' | 'transformRequest'> {
  mapLib?: typeof maplibregl | Promise<typeof maplibregl>;
}

const MISSING_WORKER_URL_WARNING =
  '[@aws-amplify/ui-react-geo] MapView: `workerUrl` is not set, so maplibre-gl may fail to load its web worker and ' +
  'the map will not load tiles. See https://ui.docs.amplify.aws/react/connected-components/geo#web-worker-setup';

let hasWarnedMissingWorkerUrl = false;

// Like `useDeprecationWarning` in `@aws-amplify/ui-react`, this deliberately treats builds without a Node `process`
// polyfill as development, so the warning still shows there. Bundlers replace `process.env.NODE_ENV` in production.
const isDevelopment = (): boolean =>
  typeof process === 'undefined' || process.env.NODE_ENV !== 'production';

/**
 * The `MapView` component uses [react-map-gl](https://visgl.github.io/react-map-gl/) and
 * [maplibre-gl-js](https://maplibre.org/maplibre-gl-js/docs/) to provide an interactive map using
 * [Amplify Geo APIs](https://docs.amplify.aws/lib/geo/getting-started/q/platform/js/) powered by
 * [Amazon Location Service](https://aws.amazon.com/location/). Since `MapView` is a wrapper of the
 * [react-map-gl/maplibre Map](https://visgl.github.io/react-map-gl/docs/api-reference/maplibre/map), it accepts the same
 * properties except `transformRequest` which is set by Amplify.
 *
 * When bundling maplibre-gl@6, pass `workerUrl` so maplibre can load its web worker. See
 * https://maplibre.org/maplibre-gl-js/docs/#installation for the bundler-specific URL.
 *
 * [📖 Docs](https://ui.docs.amplify.aws/react/connected-components/geo#mapview)
 *
 * @example
 * // Basic usage of MapView:
 * function App() {
 *   return <MapView />
 * }
 */
const MapView = forwardRef<MapRef, MapViewProps>(
  ({ mapLib, mapStyle, style, ...props }, ref) => {
    const geoConfig: GeoConfig['LocationService'] = useMemo(() => {
      return (
        Amplify.getConfig().Geo?.LocationService ??
        ({} as GeoConfig['LocationService'])
      );
    }, []);
    const [transformRequest, setTransformRequest] = useState<
      TransformRequestFunction | undefined
    >();

    const styleProps = useMemo<React.CSSProperties>(
      () => ({
        height: '100vh',
        position: 'relative',
        width: '100vw',
        ...style,
      }),
      [style]
    );

    /**
     * The transformRequest is a callback used by react-map-gl before it makes a request for an external URL. It signs
     * the request with AWS Sigv4 Auth, provided valid credentials, and is how we integrate react-map-gl with Amplify Geo
     * and Amazon Location Service. Once the transformRequest is created, we render the map.
     */
    useEffect(() => {
      let isMounted = true;

      (async () => {
        // Load the module and fetch credentials in parallel, but report their failures separately: a module-load
        // failure is usually transient, while a credentials failure is a configuration problem for the caller.
        const [amplifyModule, session] = await Promise.all([
          loadMaplibreGlJsAmplify().catch((error: unknown) => {
            // eslint-disable-next-line no-console
            console.error(
              '[@aws-amplify/ui-react-geo] MapView: failed to load maplibre-gl-js-amplify.',
              error
            );
          }),
          fetchAuthSession().catch((error: unknown) => {
            // eslint-disable-next-line no-console
            console.error(
              '[@aws-amplify/ui-react-geo] MapView: failed to fetch Amplify credentials.',
              error
            );
          }),
        ]);

        if (!isMounted || !amplifyModule || !session) {
          return;
        }

        const { credentials } = session;
        if (credentials && geoConfig) {
          const { region } = geoConfig;
          const { transformRequest: amplifyTransformRequest } =
            new amplifyModule.AmplifyMapLibreRequest(credentials, region);
          setTransformRequest(
            () => amplifyTransformRequest as TransformRequestFunction
          );
        }
      })();

      return () => {
        isMounted = false;
      };
    }, [geoConfig]);

    const shouldWarnMissingWorkerUrl = !mapLib && !props.workerUrl;
    useEffect(() => {
      if (
        shouldWarnMissingWorkerUrl &&
        !hasWarnedMissingWorkerUrl &&
        isDevelopment()
      ) {
        hasWarnedMissingWorkerUrl = true;
        // eslint-disable-next-line no-console
        console.warn(MISSING_WORKER_URL_WARNING);
      }
    }, [shouldWarnMissingWorkerUrl]);

    /**
     * Load maplibre-gl once per `mapLib` value, when the map first renders, rather than on every render. react-map-gl
     * only reads `mapLib` on mount, and a rejected import clears the loader cache, so calling `loadMaplibre()` during
     * every render would start a new import (and an unhandled rejection) on each re-render after a failure.
     */
    const shouldRenderMap = !!transformRequest;
    const mapLibrary = useMemo(
      () => (shouldRenderMap ? (mapLib ?? loadMaplibre()) : undefined),
      [mapLib, shouldRenderMap]
    );

    /**
     * The mapLib property is used by react-map-gl to override the underlying map library. By default we pass a promise
     * of the maplibre-gl dependency of this package, loaded on the client, so `workerUrl` is applied to the same
     * instance that renders the map.
     *
     * The default mapStyle we use is just the map ID provided by aws-exports.
     */
    return shouldRenderMap ? (
      <ReactMapGL
        {...props}
        mapLib={mapLibrary}
        mapStyle={mapStyle ?? geoConfig?.maps?.default}
        ref={ref}
        style={styleProps}
        transformRequest={transformRequest}
      />
    ) : null;
  }
);

MapView.displayName = 'MapView';
export { MapView };
