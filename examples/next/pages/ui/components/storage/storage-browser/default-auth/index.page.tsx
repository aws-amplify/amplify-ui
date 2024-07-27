import React from 'react';
import { Amplify } from 'aws-amplify';

import {
  createStorageBrowser,
  createAmplifyAuthAdapter,
} from '@aws-amplify/ui-react-storage';
import '@aws-amplify/ui-react-storage/styles.css';
import '@aws-amplify/ui-react-storage/storage-browser-styles.css';

import config from './aws-exports';

Amplify.configure(config);

const { StorageBrowser } = createStorageBrowser({
  config: createAmplifyAuthAdapter(),
});

export default function Example() {
  return <StorageBrowser />;
}
