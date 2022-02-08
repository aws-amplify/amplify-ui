import { ICredentials } from '@aws-amplify/core';
import { mapMachine } from '@aws-amplify/ui';
import { useMachine } from '@xstate/react';
import { Auth } from 'aws-amplify';
import { AmplifyMapLibreRequest } from 'maplibre-gl-js-amplify';
import React, { useEffect, useRef, useState } from 'react';
import ReactMapGL from 'react-map-gl';

import { Loader, View } from '../../primitives';

export const Map = ({
  children,
  height,
  latitude,
  longitude,
  width,
  zoom,
  ...rest
}: any) => {
  const mapRef = useRef<any>();
  const [credentials, setCredentials] = useState<ICredentials>();
  const [transformRequest, setRequestTransformer] = useState<any>();
  const [viewport, setViewport] = useState({
    latitude: latitude ?? 28.728,
    longitude: longitude ?? 10.041,
    zoom: zoom ?? 1.816,
  });
  const [pointerEvents, setPointerEvents] = useState<string | void>();
  const [state] = useMachine(mapMachine) as any;

  const handleMapMoveStart = () => {
    const map = mapRef.current.getMap();

    if (map.isMoving()) {
      setPointerEvents('none');
    }
  };

  const handleMapMoveEnd = () => {
    const map = mapRef.current.getMap();
    const { lat: latitude, lng: longitude } = map.getCenter();
    const zoom = map.getZoom();

    setViewport({
      latitude,
      longitude,
      zoom,
    });

    setPointerEvents();
  };

  useEffect(() => {
    const fetchCredentials = async () => {
      setCredentials(await Auth.currentUserCredentials());
    };

    fetchCredentials();
  }, []);

  // create a new transformRequest function whenever the credentials change
  useEffect(() => {
    const makeRequestTransformer = async () => {
      if (credentials != null) {
        const { transformRequest } = new AmplifyMapLibreRequest(
          credentials,
          state.context.config.region
        );
        // wrap the new value in an anonymous function to prevent React from recognizing it as a
        // function and immediately calling it
        setRequestTransformer(() => transformRequest);
      }
    };

    makeRequestTransformer();
  }, [credentials]);

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
  }, [transformRequest]);

  return transformRequest ? (
    <View data-amplify-map>
      <ReactMapGL
        ref={mapRef}
        width={width ?? '100%'}
        height={height ?? '100vh'}
        transformRequest={transformRequest}
        mapStyle={state.context.config.mapStyle}
        onViewportChange={setViewport}
        style={{ pointerEvents }}
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
