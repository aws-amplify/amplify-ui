import { Button, MapView } from '@aws-amplify/ui-react';
import { Amplify } from 'aws-amplify';
import { useCallback, useRef } from 'react';
import type { MapRef } from 'react-map-gl';

import '@aws-amplify/ui-react/styles.css';

import awsExports from './aws-exports';

Amplify.configure(awsExports);

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
