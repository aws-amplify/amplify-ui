import React, { forwardRef, useEffect, useMemo, useState } from 'react';
import maplibregl from 'maplibre-gl';
import { AmplifyMapLibreRequest } from 'maplibre-gl-js-amplify';
import ReactMapGL from 'react-map-gl';
import type { MapProps, MapRef, TransformRequestFunction } from 'react-map-gl';
import { Amplify, Auth } from 'aws-amplify';

// Utility types for missing AmplifyConfig type, only includes Geo related key/values.
// Note: these types should not be be used outside this file
type AmplifyGeoOptions = {
  maps?: { default: string };
  region: string;
};
type AmplifyGeoConfig = {
  geo?: {
    amazon_location_service?: AmplifyGeoOptions;
    AmazonLocationService?: AmplifyGeoOptions;
  };
};

interface MapViewProps extends Omit<MapProps, 'mapLib' | 'transformRequest'> {
  // replace `any` typed MapProps.mapLib
  mapLib?: typeof maplibregl;
}

/**
 * The `MapView` component uses [react-map-gl](https://visgl.github.io/react-map-gl/) and
 * [maplibre-gl-js](https://visgl.github.io/react-map-gl/) to provide an interactive map using
 * [Amplify Geo APIs](https://docs.amplify.aws/lib/geo/getting-started/q/platform/js/) powered by
 * [Amazon Location Service](https://aws.amazon.com/location/). Since `MapView` is a wrapper of the
 * [react-map-gl default Map](https://visgl.github.io/react-map-gl/docs/api-reference/map), it accepts the same
 * properties except `transformRequest` which is set by Amplify.
 *
 * [📖 Docs](https://ui.docs.amplify.aws/react/components/geo#mapview)
 *
 * @example
 * // Basic usage of MapView:
 * function App() {
 *   return <MapView />
 * }
 */
const MapView = forwardRef<MapRef, MapViewProps>(
  ({ mapLib, mapStyle, style, ...props }, ref) => {
    const amplifyConfig = Amplify.configure() as AmplifyGeoConfig;
    const geoConfig = useMemo(
      () =>
        amplifyConfig.geo?.amazon_location_service ??
        amplifyConfig.geo?.AmazonLocationService ??
        ({} as AmplifyGeoOptions),
      [amplifyConfig]
    );
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
        const credentials = await Auth.currentUserCredentials();

        if (credentials) {
          const { region } = geoConfig;
          const { transformRequest: amplifyTransformRequest } =
            new AmplifyMapLibreRequest(credentials, region);
          setTransformRequest(() => amplifyTransformRequest);
        }
      })();
    }, [geoConfig]);

    /**
     * The mapLib property is used by react-map-gl@v7 to override the underlying map library. The default library is
     * mapbox-gl-js, which uses its own copyrighted license. We override the map library with the BSD-licensed
     * maplibre-gl-js.
     *
     * The default mapStyle we use is just the map ID provided by aws-exports.
     */
    return transformRequest ? (
      <ReactMapGL
        {...props}
        mapLib={mapLib ?? maplibregl}
        mapStyle={mapStyle ?? geoConfig.maps?.default}
        ref={ref}
        style={styleProps}
        transformRequest={transformRequest}
      />
    ) : null;
  }
);

MapView.displayName = 'MapView';
export { MapView };
