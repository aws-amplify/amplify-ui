import { MapView, Button } from '@aws-amplify/ui-react';
import { Amplify } from 'aws-amplify';
import { useState } from 'react';
import { Marker } from 'react-map-gl';

import '@aws-amplify/ui-react/styles.css';

import awsExports from './aws-exports';

Amplify.configure(awsExports);

export default function MapWithMovingMarker() {
  const [{ latitude, longitude }, setMarkerLocation] = useState({
    latitude: 40,
    longitude: -100,
  });

  const updateMarker = () =>
    setMarkerLocation({ latitude: latitude + 5, longitude: longitude + 5 });

  return (
    <>
      <Button onClick={updateMarker}>Move Marker</Button>
      <MapView>
        <Marker latitude={latitude} longitude={longitude} />
      </MapView>
    </>
  );
}
