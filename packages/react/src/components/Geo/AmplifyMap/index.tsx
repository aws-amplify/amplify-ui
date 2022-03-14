import { geoMachine } from '@aws-amplify/ui';
import { useInterpret, useSelector } from '@xstate/react';
import { identity } from 'lodash';
import maplibregl from 'maplibre-gl';
import type { Style as MaplibreStyle } from 'maplibre-gl';
import { AmplifyMapLibreRequest } from 'maplibre-gl-js-amplify';
import React, { useEffect, useRef, useState } from 'react';
import ReactMapGL from 'react-map-gl';
import type { MapProps } from 'react-map-gl';

import { View } from '../../../primitives';

export const AmplifyMap = ({ children, style, ...rest }: AmplifyMapProps) => {
  const mapRef = useRef<any>();
  const [transformRequest, setTransformRequest] = useState<any>();
  const service = useInterpret(geoMachine);
  const state: any = useSelector(service, identity);

  const styleProps = {
    height: '100vh',
    position: 'relative',
    width: '100vw',
    ...style,
  } as React.CSSProperties;

  useEffect(() => {
    const makeRequestTransformer = async () => {
      if (state.context.credentials != null) {
        const { transformRequest: amplifyTransformRequest } =
          new AmplifyMapLibreRequest(
            state.context.credentials,
            state.context.config.region
          );
        setTransformRequest(() => amplifyTransformRequest);
      }
    };

    makeRequestTransformer();
  }, [state.context.credentials]);

  return transformRequest ? (
    <View data-amplify-map>
      <ReactMapGL
        ref={mapRef}
        mapLib={maplibregl}
        transformRequest={transformRequest}
        mapStyle={state.context.config.mapId}
        style={styleProps}
        {...rest}
      >
        {children}
      </ReactMapGL>
    </View>
  ) : null;
};

export type AmplifyMapProps = Omit<
  MapProps,
  'mapboxAccessToken' | 'mapLib' | 'transformRequest'
>;

type AmplifyMapPropsB = {
  cursor?: Pick<React.CSSProperties, 'cursor'>;
  mapStyle: string | MaplibreStyle;
};
