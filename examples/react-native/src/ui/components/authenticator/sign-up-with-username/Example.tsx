import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Authenticator } from '@aws-amplify/ui-react-native';
import { Amplify } from 'aws-amplify';
import { parseAWSExports } from '@aws-amplify/core/internals/utils';

import { SignOutButton } from '../SignOutButton';
import awsconfig from './aws-exports';

const config = parseAWSExports(awsconfig);
if (!config.Auth) {
  throw new Error('Auth config not found');
}
// mock server endpoint for Detox e2es
config.Auth.Cognito.userPoolEndpoint = 'http://127.0.0.1:9091/';
Amplify.configure(config);

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
