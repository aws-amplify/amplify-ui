import React from 'react';
import { StyleSheet, View } from 'react-native';

import { useDeepLinkingDebug } from '../../../hooks';

import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react-native';
import { Amplify } from 'aws-amplify';

import { Button } from '../../../ui';

// replace with actual amplify config from environments
import config from '../../../aws-exports';

Amplify.configure(config ?? {});

function SignOutButton() {
  const { signOut } = useAuthenticator();
  return <Button onPress={signOut}>Sign Out</Button>;
}

function App() {
  useDeepLinkingDebug();

  return (
    <Authenticator.Provider>
      <Authenticator>
        <View style={style.container}>
          <SignOutButton />
        </View>
      </Authenticator>
    </Authenticator.Provider>
  );
}

const style = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});

export default App;
