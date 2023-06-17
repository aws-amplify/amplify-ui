import { useMap } from 'react-map-gl';
import { Amplify } from 'aws-amplify';
import { Button } from '@aws-amplify/ui-react';
import { MapView } from '@aws-amplify/ui-react-geo';

import '@aws-amplify/ui-react/styles.css';
import '@aws-amplify/ui-react-geo/styles.css';

import awsExports from './aws-exports';

Amplify.configure(awsExports);

function FlyToButton() {
  const { current: map } = useMap();

  const flyToMordor = () => {
    map.flyTo({ center: [172.78, -42.28], zoom: 5 });
  };

  return <Button onClick={flyToMordor}>Fly, you fools!</Button>;
}

export default function MapWithButton() {
  return (
    <MapView>
      <FlyToButton />
    </MapView>
  );
}
