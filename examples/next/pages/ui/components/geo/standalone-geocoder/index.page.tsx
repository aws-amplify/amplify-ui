import { Geocoder } from '@aws-amplify/ui-react';
import { Amplify } from 'aws-amplify';

import '@aws-amplify/ui-react/styles.css';

import awsExports from './aws-exports';

Amplify.configure(awsExports);

const SAN_FRANCISCO = {
  latitude: 37.774,
  longitude: -122.431,
};

export default function StandaloneGeocoder() {
  return <Geocoder proximity={SAN_FRANCISCO} />;
}
