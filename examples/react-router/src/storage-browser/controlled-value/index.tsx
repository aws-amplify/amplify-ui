import { useSearchParams } from 'react-router-dom';
import { useCallback, useState } from 'react';

import { Amplify } from 'aws-amplify';
import {
  createAmplifyAuthAdapter,
  createStorageBrowser,
  // defaultActionConfigs,
} from '@aws-amplify/ui-react-storage/browser';
import '@aws-amplify/ui-react-storage/styles.css';

import outputs from '@aws-amplify/ui-environments/storage/gen2/amplify_outputs.json';

Amplify.configure(outputs);
// import Store from '.././../Store';
// const store = new Store();

const { StorageBrowser } = createStorageBrowser({
  config: createAmplifyAuthAdapter(),
});
// const { StorageBrowser } = createStorageBrowser({
//   actions: {
//     default: {
//       ...defaultActionConfigs,
//       listLocationItems: store.listLocationItems,
//     },
//   },
//   config: {
//     getLocationCredentials: () =>
//       Promise.resolve({
//         credentials: {
//           accessKeyId: 'accessKeyId',
//           expiration: new Date(),
//           secretAccessKey: 'secretAccessKey',
//           sessionToken: 'sessionToken',
//         },
//       }),
//     listLocations: store.listLocations,
//     region: 'hshsh',
//     registerAuthListener: () => null,
//   },
// });

export default function App() {
  // const params = useParams<{ location: string; path: string }>();
  // const initialParams = new URLSearchParams();
  // if (params.location) {
  //   initialParams.set('location', params.location);
  // }
  // if (params.path) {
  //   initialParams.set('path', params.path);
  // }
  const [searchParams, setSearchParams] = useSearchParams({
    location: JSON.stringify({}),
    path: '',
  });

  const location = searchParams.get('location');
  const path = searchParams.get('path');

  console.log('url location', location);
  console.log('url path', path);

  const [value, setValue] = useState('');

  const handleLocationChange = useCallback(
    (value: any) => {
      console.log('location change', value);

      setSearchParams((prev) => {
        prev.set('location', JSON.stringify(value.location));
        prev.set('path', value.path);

        return prev;
      });
    },
    [setSearchParams]
  );

  return (
    <>
      <input
        value={value}
        onChange={({ target }) => {
          setValue(target.value);
        }}
      />
      <StorageBrowser
        location={location ? JSON.parse(location) : {}}
        onLocationChange={handleLocationChange}
        path={path ?? ''}
        // key={path ?? 'noooooo'}
        // displayText={{
        //   LocationsView: {
        //     searchPlaceholder: 'Inner',
        //   },
        // }}
        // defaultValue={{ location: location ? JSON.parse(location) : null, path }}
      />
    </>
  );
}
