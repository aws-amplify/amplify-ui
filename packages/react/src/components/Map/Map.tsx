import { ICredentials } from '@aws-amplify/core';
import { Auth } from 'aws-amplify';
import { AmplifyMapLibreRequest } from 'maplibre-gl-js-amplify';
import { useEffect, useState } from 'react';
import ReactMapGL, { NavigationControl } from 'react-map-gl';

import 'maplibre-gl/dist/maplibre-gl.css';

import './index.css';

export const Map = (props: any) => {
  const [credentials, setCredentials] = useState<ICredentials>();
  const [transformRequest, setRequestTransformer] = useState<any>();

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

  return transformRequest ? (
    <ReactMapGL
      ref={props.mapRef ?? null}
      width="100%"
      height="100vh"
      transformRequest={transformRequest}
      mapStyle={'map5df169f7-staging'}
      {...props}
    >
      <div style={{ position: 'absolute', left: 20, top: 20 }}>
        <NavigationControl showCompass={true} />
      </div>
      {...props.children}
    </ReactMapGL>
  ) : (
    <h1>Loading...</h1>
  );
};
