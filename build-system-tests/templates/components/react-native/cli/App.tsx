import React, { useEffect } from 'react';
import { Button, Text } from 'react-native';

import { Amplify, Notifications } from 'aws-amplify';
import {
  Authenticator,
  useAuthenticator,
  InAppMessageDisplay,
  InAppMessagingProvider,
} from '@aws-amplify/ui-react-native';
import 'react-native-get-random-values';
import 'react-native-url-polyfill/auto';

import awsExports from './aws-exports';
Amplify.configure(awsExports);

const { InAppMessaging } = Notifications;

function SignOutButton() {
  const { signOut } = useAuthenticator();
  return <Button title="Sign Out" onPress={signOut} />;
}

function App(): JSX.Element {
  useEffect(() => {
    // sync remote in-app messages
    InAppMessaging.syncMessages();
  }, []);
  return (
    <>
      <Authenticator.Provider>
        <Authenticator>
          <SignOutButton />
        </Authenticator>
      </Authenticator.Provider>
      <InAppMessagingProvider>
        <InAppMessageDisplay />
        <Text>In-App Messaging Example</Text>
      </InAppMessagingProvider>
    </>
  );
}

export default App;
