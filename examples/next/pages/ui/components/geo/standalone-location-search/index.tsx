import { Amplify } from 'aws-amplify';
import { LocationSearch } from '@aws-amplify/ui-react-geo';

import '@aws-amplify/ui-react-geo/styles.css';

import awsExports from './aws-exports';

Amplify.configure(awsExports);

const SAN_FRANCISCO = {
  latitude: 37.774,
  longitude: -122.431,
};

export default function StandaloneLocationSearch() {
  return <LocationSearch proximity={SAN_FRANCISCO} />;
}
