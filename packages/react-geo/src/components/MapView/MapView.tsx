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
  mapLib?: typeof maplibregl;
}

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
      (async () => {
        const [{ credentials }, { AmplifyMapLibreRequest }] = await Promise.all(
          [fetchAuthSession(), loadMaplibreGlJsAmplify()]
        );

        if (credentials && geoConfig) {
          const { region } = geoConfig;
          const { transformRequest: amplifyTransformRequest } =
            new AmplifyMapLibreRequest(credentials, region);
          setTransformRequest(
            () => amplifyTransformRequest as TransformRequestFunction
          );
        }
      })();
    }, [geoConfig]);

    /**
     * The mapLib property is used by react-map-gl to override the underlying map library. By default we pass a promise
     * of the maplibre-gl dependency of this package, loaded on the client, so `workerUrl` is applied to the same
     * instance that renders the map.
     *
     * The default mapStyle we use is just the map ID provided by aws-exports.
     */
    return transformRequest ? (
      <ReactMapGL
        {...props}
        mapLib={mapLib ?? loadMaplibre()}
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
