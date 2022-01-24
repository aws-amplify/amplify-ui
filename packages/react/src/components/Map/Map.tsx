import { ICredentials } from '@aws-amplify/core';
import { Auth } from 'aws-amplify';
import { AmplifyMapLibreRequest } from 'maplibre-gl-js-amplify';
import React, { useEffect, useRef, useState } from 'react';
import ReactMapGL from 'react-map-gl';

import 'maplibre-gl/dist/maplibre-gl.css';

import { View } from '../../primitives';

import './index.css';

export const Map = (props: any) => {
  const mapRef = useRef<any>();
  const [credentials, setCredentials] = useState<ICredentials>();
  const [transformRequest, setRequestTransformer] = useState<any>();
  const [viewport, setViewport] = useState({
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 10,
  });
  const [pointerEvents, setPointerEvents] = useState<string | void>();

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
          'us-east-1'
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
    <View width="100%" height="100vh">
      <ReactMapGL
        ref={mapRef}
        width="100%"
        height="100vh"
        transformRequest={transformRequest}
        mapStyle={'map5df169f7-staging'}
        onViewportChange={setViewport}
        style={{ pointerEvents }}
        {...viewport}
      >
        {React.Children.map(props.children, (child) =>
          React.cloneElement(child, { mapRef })
        )}
      </ReactMapGL>
    </View>
  ) : (
    <h1>Loading...</h1>
  );
};
