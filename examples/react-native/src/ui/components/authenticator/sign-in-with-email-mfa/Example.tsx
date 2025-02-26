import React from 'react';

import { StyleSheet, View } from 'react-native';
import {
  Authenticator,
  AuthenticatorProps,
} from '@aws-amplify/ui-react-native';
import { Amplify } from 'aws-amplify';

import { SignOutButton } from '../SignOutButton';
import awsConfig from './aws-exports';

Amplify.configure(awsConfig);

const customServices: AuthenticatorProps['services'] = {
  handleSignIn: async () => {
    return {
      isSignedIn: false,
      nextStep: {
        signInStep: 'CONFIRM_SIGN_IN_WITH_EMAIL_CODE',
        codeDeliveryDetails: {
          destination: 'a***@e***.com',
          deliveryMedium: 'EMAIL',
          attributeName: 'email',
        },
      },
    };
  },
  handleConfirmSignIn: async ({ challengeResponse }) => {
    if (challengeResponse.includes('@example.com')) {
      return {
        isSignedIn: true,
        nextStep: {
          signInStep: 'DONE',
        },
      };
    }
    throw new Error('Invalid code or auth state for the user.');
  },
  getCurrentUser: async () => {
    return {
      userId: '******************',
      username: 'james',
    };
  },
};

function App() {
  return (
    <Authenticator.Provider>
      <Authenticator services={customServices}>
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
