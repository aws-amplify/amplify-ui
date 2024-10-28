import React from 'react';

import { createStorageBrowser } from '@aws-amplify/ui-react-storage/browser';

import { managedAuthAdapter } from '../managedAuthAdapter';
import { SignIn, SignOutButton } from './routed/components';

import '@aws-amplify/ui-react-storage/storage-browser-styles.css';
import '@aws-amplify/ui-react-storage/styles.css';

const { StorageBrowser } = createStorageBrowser({
  config: managedAuthAdapter,
  actions: {
    Share: {
      options: {
        displayName: 'Share',
        hide(permission) {
          return permission === 'WRITE';
        },
      },
    },
    MyCustom: {},
  },
});

function Example() {
  const [showSignIn, setShowSignIn] = React.useState(false);

  return !showSignIn ? (
    <SignIn onSignIn={() => setShowSignIn(true)} />
  ) : (
    <>
      <SignOutButton onSignOut={() => setShowSignIn(false)} />
      <StorageBrowser />
    </>
  );
}

export default Example;
