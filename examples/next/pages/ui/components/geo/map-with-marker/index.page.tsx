import { AmplifyMap, Geocoder, Marker } from '@aws-amplify/ui-react';
import { Amplify } from 'aws-amplify';

import '@aws-amplify/ui-react/styles.css';

import awsExports from './aws-exports';

Amplify.configure(awsExports);

export default function MapWithMarker() {
  return (
    <AmplifyMap>
      <Marker longitude={-100} latitude={40} />
      <Geocoder />
    </AmplifyMap>
  );
}
