import React, { useEffect } from 'react';
import { Amplify } from 'aws-amplify';
import { fetchAuthSession, signOut } from 'aws-amplify/auth';

import { Button, withAuthenticator } from '@aws-amplify/ui-react';
import {
  createStorageBrowser,
  createAmplifyAuthAdapter,
  elementsDefault,
} from '@aws-amplify/ui-react-storage/browser';
import '@aws-amplify/ui-react-storage/styles.css';
import '@aws-amplify/ui-react-storage/storage-browser-styles.css';

import config from './aws-exports';

Amplify.configure(config);

function Example() {
  const [identityId, setIdentityId] = React.useState<string>(null);

  useEffect(() => {
    fetchAuthSession().then((data) => setIdentityId(data.identityId));
  }, []);

  const { StorageBrowser } = createStorageBrowser({
    actions: {},
    elements: elementsDefault,
    config: createAmplifyAuthAdapter({
      options: {
        defaultPrefixes: [
          'public/',
          'forbidden/',
          ...(identityId
            ? [`protected/${identityId}/`, `private/${identityId}/`]
            : []),
        ],
      },
    }),
  });

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
      {identityId && <StorageBrowser />}
    </>
  );
}

export default withAuthenticator(Example);
