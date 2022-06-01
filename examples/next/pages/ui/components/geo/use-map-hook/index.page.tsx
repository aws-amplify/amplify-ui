import { Button, MapView } from '@aws-amplify/ui-react';
import { Amplify } from 'aws-amplify';
import { useMap } from 'react-map-gl';

import '@aws-amplify/ui-react/styles.css';

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
