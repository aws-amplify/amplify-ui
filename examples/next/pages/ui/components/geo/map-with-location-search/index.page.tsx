import { Amplify } from 'aws-amplify';
import { MapView, LocationSearch } from '@aws-amplify/ui-react-geo';

import '@aws-amplify/ui-react-geo/styles.css';

const amplifyOutputs = (
  await import(`@environments/geo/basic-map/${process.env.PATH}`)
).default;

Amplify.configure(amplifyOutputs);

export default function MapWithLocationSearch() {
  return (
    <MapView>
      <LocationSearch />
    </MapView>
  );
}
