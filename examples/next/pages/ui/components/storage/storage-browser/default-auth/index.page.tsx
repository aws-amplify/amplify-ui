import React, { useEffect } from 'react';
import { Amplify } from 'aws-amplify';
import { signOut } from 'aws-amplify/auth';

import { Button, withAuthenticator } from '@aws-amplify/ui-react';
import { DefaultStorageBrowser as StorageBrowser } from '@aws-amplify/ui-react-storage/browser';
import '@aws-amplify/ui-react-storage/styles.css';
import '@aws-amplify/ui-react-storage/storage-browser-styles.css';

import config from './aws-exports';

Amplify.configure(config);

const defaultPrefixes = [
  'public/',
  'forbidden/',
  (identityId: string) => `protected/${identityId}/`,
  (identityId: string) => `private/${identityId}/`,
];

function Example() {
  return (
    <>
      <Button
        marginBlockEnd="xl"
        size="small"
        onClick={() => {
          signOut();
        }}
      >
        Sign Out
      </Button>
      <StorageBrowser defaultPrefixes={defaultPrefixes} />
    </>
  );
}

export default withAuthenticator(Example);
