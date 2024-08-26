import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Authenticator } from '@aws-amplify/ui-react-native';
import { Amplify } from 'aws-amplify';

import { SignOutButton } from '../SignOutButton';
import { VERSION } from '@env';

const AMPLIFY_CONFIG_PATH =
  VERSION === 'gen1' ? 'src/amplifyconfiguration' : 'amplify_outputs';

const amplifyOutputs = require(
  `@aws-amplify/ui-environments/auth/auth-with-phone-number/${AMPLIFY_CONFIG_PATH}`
);

Amplify.configure(amplifyOutputs);

const existingConfig = Amplify.getConfig();
Amplify.configure({
  ...existingConfig,
  Auth: {
    ...existingConfig.Auth,
    // @ts-ignore
    Cognito: {
      ...existingConfig.Auth?.Cognito,
      // mock server endpoint for Detox e2es
      userPoolEndpoint: 'http://127.0.0.1:9091/',
    },
  },
});

function App() {
  return (
    <Authenticator.Provider>
      <Authenticator initialState="signUp">
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
