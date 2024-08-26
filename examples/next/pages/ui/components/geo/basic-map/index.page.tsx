import { Amplify } from 'aws-amplify';
import { MapView } from '@aws-amplify/ui-react-geo';

import '@aws-amplify/ui-react-geo/styles.css';

const amplifyOutputs = (
  await import(`@environments/geo/basic-map/${process.env.PATH}`)
).default;

Amplify.configure(amplifyOutputs);

export default function BasicMap() {
  return <MapView />;
}
