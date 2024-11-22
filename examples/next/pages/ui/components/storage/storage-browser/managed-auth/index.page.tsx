import React from 'react';

import { createStorageBrowser } from '@aws-amplify/ui-react-storage/browser';

import { managedAuthAdapter } from '../managedAuthAdapter';
import { SignIn, SignOutButton } from './routed/components';

import { Flex, View } from '@aws-amplify/ui-react';

import '@aws-amplify/ui-react-storage/styles.css';

const { StorageBrowser } = createStorageBrowser({
  config: managedAuthAdapter,
});

function Example() {
  const [showSignIn, setShowSignIn] = React.useState(false);

  return !showSignIn ? (
    <SignIn onSignIn={() => setShowSignIn(true)} />
  ) : (
    <Flex
      direction="column"
      width="100vw"
      height="100vh"
      overflow="hidden"
      padding="xl"
    >
      <SignOutButton onSignOut={() => setShowSignIn(false)} />
      <View flex="1" overflow="hidden">
        <StorageBrowser
          displayText={{ LocationsView: { title: 'Home - Managed Auth' } }}
        />
      </View>
    </Flex>
  );
}

export default Example;
