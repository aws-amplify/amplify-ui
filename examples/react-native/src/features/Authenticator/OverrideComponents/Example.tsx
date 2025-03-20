/**
 * Example.tsx
 */

import React from 'react';

import { useColorScheme } from 'react-native';
import {
  MD3LightTheme as LightTheme,
  MD3DarkTheme as DarkTheme,
  PaperProvider,
} from 'react-native-paper';
import {
  Authenticator,
  AuthenticatorProps,
} from '@aws-amplify/ui-react-native';
import { Amplify } from 'aws-amplify';
import outputs from '@aws-amplify/ui-environments/auth/gen2/auth-with-federated-sign-in-react-native/amplify_outputs.json';

import { ConfirmResetPassword } from './ConfirmResetPassword';
import { ConfirmSignIn } from './ConfirmSignIn';
import { ConfirmSignUp } from './ConfirmSignUp';
import { ConfirmVerifyUser } from './ConfirmVerifyUser';
import { ForceNewPassword } from './ForceNewPassword';
import { ForgotPassword } from './ForgotPassword';
import { SetupTotp } from './SetupTotp';
import { SignIn } from './SignIn';
import { SignUp } from './SignUp';
import { VerifyUser } from './VerifyUser';
import { Container, SignOutButton } from './components';

Amplify.configure(outputs);

const components: AuthenticatorProps['components'] = {
  ConfirmResetPassword,
  ConfirmSignIn,
  ConfirmSignUp,
  ConfirmVerifyUser,
  ForceNewPassword,
  ForgotPassword,
  SetupTotp,
  SignIn,
  SignUp,
  VerifyUser,
};

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <PaperProvider theme={isDarkMode ? DarkTheme : LightTheme}>
      <Authenticator.Provider>
        <Authenticator Container={Container} components={components}>
          <SignOutButton />
        </Authenticator>
      </Authenticator.Provider>
    </PaperProvider>
  );
}

export default App;
