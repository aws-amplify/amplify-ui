import React from 'react';
import { Amplify } from 'aws-amplify';
import { signOut } from 'aws-amplify/auth';

import { Button, Flex, View, withAuthenticator } from '@aws-amplify/ui-react';
import { StorageBrowser } from '@aws-amplify/ui-react-storage';
import '@aws-amplify/ui-react/styles/reset.css';
import '@aws-amplify/ui-react-storage/styles.css';
import '@aws-amplify/ui-react-storage/storage-browser-styles.css';

import config from './aws-exports';

Amplify.configure(config);

const defaultPrefixes = [
  'public/',
  // intentionally added to test a prefix that should return 403 forbidden
  'forbidden/',
  (identityId: string) => `protected/${identityId}/`,
  (identityId: string) => `private/${identityId}/`,
];

function Example() {
  return (
    <Flex
      direction="column"
      width="100vw"
      height="100vh"
      overflow="hidden"
      padding="xl"
    >
      <Button
        marginBlockEnd="xl"
        alignSelf="flex-start"
        size="small"
        onClick={() => {
          signOut();
        }}
      >
        Sign Out
      </Button>
      <View flex="1" overflow="hidden">
        <StorageBrowser defaultPrefixes={defaultPrefixes} />
      </View>
    </Flex>
  );
}

export default withAuthenticator(Example);
