import { Amplify } from 'aws-amplify';

import {
  createAmplifyAuthAdapter,
  createStorageBrowser,
  elementsDefault,
} from '@aws-amplify/ui-react-storage/browser';
import '@aws-amplify/ui-react-storage/styles.css';
import '@aws-amplify/ui-react-storage/storage-browser-styles.css';

import config from './aws-exports';
import { routedAuth } from '../../managed-auth/routed/StorageBrowser';

Amplify.configure(config);

export const { StorageBrowser } = createStorageBrowser({
  elements: elementsDefault,
  config: createAmplifyAuthAdapter({
    registerAuthListener: routedAuth.registerAuthListener,
  }),
});
