import { Amplify } from 'aws-amplify';
import { useCallback, useRef, useState } from 'react';

import { Map, Geocoder } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import awsExports from './aws-exports';

Amplify.configure(awsExports);

export default function BasicMap() {
  const [viewport, setViewport] = useState({
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 8,
  });

  const mapRef = useRef();

  return (
    <>
      <Map {...viewport} mapRef={mapRef} onViewportChange={setViewport}>
        <Geocoder mapRef={mapRef} onViewportChange={setViewport} />
      </Map>
    </>
  );
}
