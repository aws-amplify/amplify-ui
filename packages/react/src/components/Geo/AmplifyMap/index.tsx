import { geoMachine } from '@aws-amplify/ui';
import { useInterpret, useSelector } from '@xstate/react';
import { identity } from 'lodash';
import maplibregl from 'maplibre-gl';
import { AmplifyMapLibreRequest } from 'maplibre-gl-js-amplify';
import { useCallback, useEffect, useRef, useState } from 'react';
import ReactMapGL from 'react-map-gl';

import { View } from '../../../primitives';

export const AmplifyMap = ({ children, style, ...rest }: any) => {
  const mapRef = useRef<any>();
  const [transformRequest, setTransformRequest] = useState<any>();
  const service = useInterpret(geoMachine);
  const state: any = useSelector(service, identity);

  const styleProps = {
    height: '100vh',
    position: 'relative',
    width: '100%',
    ...style,
  };

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
