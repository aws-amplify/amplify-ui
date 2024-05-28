import { useCallback, useRef } from 'react';
import type { MapRef } from 'react-map-gl'; // Note: this dependency should NOT be installed separately
import { Amplify } from 'aws-amplify';
import { Button } from '@aws-amplify/ui-react';
import { MapView } from '@aws-amplify/ui-react-geo';

import '@aws-amplify/ui-react/styles.css';
import '@aws-amplify/ui-react-geo/styles.css';

const amplifyOutputs = (
  await import(`@environments/geo/basic-map/${process.env.PATH}`)
).default;

Amplify.configure(amplifyOutputs);

export default function MapWithRef() {
  const mapRef = useRef<MapRef>();

  const flyToMordor = useCallback(() => {
    mapRef.current.flyTo({ center: [172.78, -42.28], zoom: 5 });
  }, []);

  return (
    <>
      <Button onClick={flyToMordor}>Fly, you fools!</Button>
      <MapView ref={mapRef} />
    </>
  );
}
