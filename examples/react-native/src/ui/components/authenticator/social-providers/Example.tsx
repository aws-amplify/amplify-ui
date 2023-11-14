import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Authenticator } from '@aws-amplify/ui-react-native';
import { Amplify } from 'aws-amplify';
import { ConsoleLogger } from 'aws-amplify/utils';

import { SignOutButton } from '../SignOutButton';
import awsconfig from './aws-exports';

// @ts-expect-error
ConsoleLogger.LOG_LEVEL = 'DEBUG';
Amplify.configure(awsconfig);

function App() {
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
