import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Authenticator } from '@aws-amplify/ui-react-native';
import { Amplify } from 'aws-amplify';

import { SignOutButton } from '../SignOutButton';
import { AuthContext, emailRegex } from '@aws-amplify/ui';
import awsConfig from './aws-exports';

Amplify.configure(awsConfig);

const customServices: AuthContext['services'] = {
  handleSignIn: async () => {
    return {
      isSignedIn: false,
      nextStep: {
        signInStep: 'CONTINUE_SIGN_IN_WITH_MFA_SETUP_SELECTION',
        allowedMFATypes: ['EMAIL', 'TOTP'],
      },
    };
  },
  handleConfirmSignIn: async ({ challengeResponse }) => {
    if (challengeResponse === 'EMAIL') {
      return {
        isSignedIn: false,
        nextStep: {
          signInStep: 'CONTINUE_SIGN_IN_WITH_EMAIL_SETUP',
        },
      };
    }
    if (emailRegex.test(challengeResponse)) {
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
    }
    if (/^\d{6}$/.test(challengeResponse)) {
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
