import React from 'react';
import { Amplify } from 'aws-amplify';
import { signOut } from 'aws-amplify/auth';

import {
  Button as _Button,
  Table as _Table,
  TableCell as _TableCell,
  TableHead as _TableHead,
  withAuthenticator,
} from '@aws-amplify/ui-react';
import {
  createStorageBrowser,
  createAmplifyAuthAdapter,
} from '@aws-amplify/ui-react-storage';
import '@aws-amplify/ui-react-storage/styles.css';
import '@aws-amplify/ui-react-storage/storage-browser-styles.css';

import config from './aws-exports';
import { elements } from './custom-elements';

Amplify.configure(config);

const { StorageBrowser } = createStorageBrowser({
  elements,
  config: createAmplifyAuthAdapter({
    options: { defaultPrefixes: ['public/', 'private/', 'protected/'] },
  }),
});

function Example() {
  return (
    <>
      <_Button
        onClick={() => {
          signOut();
        }}
      >
        Sign Out
      </_Button>
      <StorageBrowser />
    </>
  );
}

export default withAuthenticator(Example);
