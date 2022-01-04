import React, { useEffect, useState } from 'react';
import { createRequestTransformer } from 'amazon-location-helpers';
import { ICredentials } from '@aws-amplify/core';
import { Auth } from 'aws-amplify';
import ReactMapGL, { NavigationControl, ViewportProps } from 'react-map-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

import './index.css';

export const Map = () => {
  const [credentials, setCredentials] = useState<ICredentials>();
  const [transformRequest, setRequestTransformer] = useState<any>();

  const [viewport, setViewport] = React.useState<Partial<ViewportProps>>({
    longitude: -123.1187,
    latitude: 49.2819,
    zoom: 10,
  });

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
        const tr = await createRequestTransformer({
          credentials,
          region: 'us-east-1',
        });
        // wrap the new value in an anonymous function to prevent React from recognizing it as a
        // function and immediately calling it
        setRequestTransformer(() => tr);
      }
    };

    makeRequestTransformer();
  }, [credentials]);

  return (
    <div>
      {transformRequest ? (
        <ReactMapGL
          {...viewport}
          width="100%"
          height="100vh"
          transformRequest={transformRequest}
          mapStyle={'map5df169f7-staging'}
          onViewportChange={setViewport}
        >
          <div style={{ position: 'absolute', left: 20, top: 20 }}>
            <NavigationControl showCompass={true} />
          </div>
        </ReactMapGL>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
};
