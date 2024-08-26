import { useState } from 'react';
import { Marker } from 'react-map-gl'; // Note: this dependency should NOT be installed separately
import { Amplify } from 'aws-amplify';
import { Button } from '@aws-amplify/ui-react';
import { MapView } from '@aws-amplify/ui-react-geo';

import '@aws-amplify/ui-react/styles.css';
import '@aws-amplify/ui-react-geo/styles.css';

const amplifyOutputs = (
  await import(`@environments/geo/basic-map/${process.env.PATH}`)
).default;

Amplify.configure(amplifyOutputs);

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
