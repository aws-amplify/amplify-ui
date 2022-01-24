import { Amplify } from 'aws-amplify';
import { useCallback, useRef, useState } from 'react';

import { Map, Geocoder } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import awsExports from './aws-exports';

Amplify.configure(awsExports);

export default function BasicMap() {
  return (
    <Map>
      <Geocoder />
    </Map>
  );
}
