import { mapMachine } from '@aws-amplify/ui';
import { useInterpret, useSelector } from '@xstate/react';
import { identity } from 'lodash';
import { AmplifyMapLibreRequest } from 'maplibre-gl-js-amplify';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import ReactMapGL from 'react-map-gl';

import { Loader, View } from '../../primitives';

export const Map = ({
  bearing = 0,
  children,
  height,
  latitude = 0,
  longitude = 0,
  pitch = 0,
  width,
  zoom = 0,
  ...rest
}: any) => {
  const mapRef = useRef<any>();
  const [transformRequest, setTransformRequest] = useState<any>();
  const [viewport, setViewport] = useState({
    bearing,
    latitude,
    longitude,
    pitch,
    zoom,
  });
  const service = useInterpret(mapMachine);
  const { send } = service;
  const state: any = useSelector(service, identity);

  const shouldDisableInteraction = state.matches('transitioning');

  const handleMapMoveStart = useCallback(
    ({ target: map }) => {
      if (map.isMoving()) {
        send('TRANSITION_START');
      }
    },
    [send]
  );

  const handleMapMoveEnd = useCallback(
    ({ target: map }) => {
      if (state.matches('transitioning')) {
        const { lat: latitude, lng: longitude } = map.getCenter();
        setViewport({
          bearing: map.getBearing(),
          latitude,
          longitude,
          pitch: map.getPitch(),
          zoom: map.getZoom(),
        });
        send('TRANSITION_END');
      }
    },
    [state.value, send]
  );

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

  useEffect(() => {
    if (transformRequest) {
      const map = mapRef.current?.getMap();

      map.on('movestart', handleMapMoveStart);
      map.on('moveend', handleMapMoveEnd);

      return () => {
        map.off('movestart', handleMapMoveStart);
        map.off('moveend', handleMapMoveEnd);
      };
    }
  }, [transformRequest, handleMapMoveEnd, handleMapMoveStart]);

  return transformRequest ? (
    <View data-amplify-map>
      <ReactMapGL
        ref={mapRef}
        width={width ?? '100%'}
        height={height ?? '100vh'}
        transformRequest={transformRequest}
        mapStyle={state.context.config.mapId}
        onViewportChange={setViewport}
        {...(shouldDisableInteraction
          ? { style: { pointerEvents: 'none' } }
          : {})}
        {...viewport}
        {...rest}
      >
        {React.Children.map(children, (child) =>
          React.cloneElement(child, { mapRef })
        )}
      </ReactMapGL>
    </View>
  ) : (
    <Loader size="large" variation="linear" />
  );
};
