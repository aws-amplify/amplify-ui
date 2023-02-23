import { LocationSearch } from '@aws-amplify/ui-react';
import { Amplify } from 'aws-amplify';

import '@aws-amplify/ui-react/styles.css';

import awsExports from './aws-exports';

Amplify.configure(awsExports);

const SAN_FRANCISCO = {
  latitude: 37.774,
  longitude: -122.431,
};

const onLocationSearchResult = (event) => {
  console.log('Result event is firing');
  console.log(event);
};

const onLocationSearchResults = (event) => {
  console.log('Results event is firing');
  console.log(event);
};

const onLocationSearchClear = () => {
  console.log('Clear event is firing');
};

const onLocationSearchLoading = (event) => {
  console.log('Loading event is firing');
  console.log(event);
};

export default function StandaloneLocationSearch() {
  return (
    <LocationSearch
      onResult={onLocationSearchResult}
      onClear={onLocationSearchClear}
      onLoading={onLocationSearchLoading}
      onResults={onLocationSearchResults}
      proximity={SAN_FRANCISCO}
    />
  );
}
