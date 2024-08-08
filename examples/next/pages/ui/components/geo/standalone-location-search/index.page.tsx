import { Amplify } from 'aws-amplify';
import { LocationSearch } from '@aws-amplify/ui-react-geo';

import '@aws-amplify/ui-react-geo/styles.css';

const amplifyOutputs = (
  await import(`@environments/geo/basic-map/${process.env.PATH}`)
).default;

Amplify.configure(amplifyOutputs);

const SAN_FRANCISCO = {
  latitude: 37.774,
  longitude: -122.431,
};

export default function StandaloneLocationSearch() {
  return <LocationSearch proximity={SAN_FRANCISCO} />;
}
