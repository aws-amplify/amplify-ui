import { translations } from '@aws-amplify/ui';
import {
  Authenticator,
  Loader,
  useAuthenticator,
  View,
  Tabs,
} from '@aws-amplify/ui-react';
import { I18n } from 'aws-amplify';
import * as React from 'react';

type ScreenProps = {
  Component:
    | Authenticator.SignIn
    | Authenticator.SignUp
    | Authenticator.SetupTOTP;
};

function Screen({ Component }: ScreenProps) {
  const { route } = useAuthenticator();

  if (route === 'idle') {
    return <Loader variation="linear" />;
  }

  if (!Component) {
    throw new Error(
      'Component is not defined. Please check the component name'
    );
  }

  return <Component />;
}

export function LabelsAndTextDemo({ Component }: ScreenProps) {
  return (
    <Authenticator.Provider>
      <View data-amplify-authenticator="">
        <View data-authenticator-variation="modal" />

        <View data-amplify-container="">
          <Screen Component={Component} />
        </View>
      </View>
    </Authenticator.Provider>
  );
}

export function LabelsAndTextDemoTabs({ children }) {
  const [index, setIndex] = React.useState('0');

  if (index === '0') {
    I18n.putVocabulariesForLanguage('en', translations['en']);
  } else {
    I18n.putVocabulariesForLanguage('en', {
      // Sign In screen
      'Sign In': 'Login', // Tab header
      'Sign in': 'Log in', // Button label
      'Sign in to your account': 'Welcome Back!', // Header text
      Username: 'Enter your username', // Username label
      Password: 'Enter your password', // Password label
      'Forgot your password? ': 'Reset Password',

      // Sign Up screen
      'Create Account': 'Register', // Tab header
      'Create a new account': 'New User', // Header text
      'Confirm Password': 'Confirm your password', // Confirm Password label
      Email: 'Enter your email',
      'Phone Number': 'Enter your phone number',

      // Setup TOTP screen
      Loading: 'QR code would show here',
      Code: '2FA Code',
      Confirm: 'Confirm 2FA',
      'Back to Sign In': 'Back to Login',

      // Reset Password screen
      'Reset your password': 'Forgot your password?',
      'Enter your username': 'Username or Email',
      'Send code': 'Reset my password',
      // 'Back to Sign In': 'Back to Login', # Already set
    });
  }

  return (
    <Tabs currentIndex={index} onChange={(i: string) => setIndex(i)}>
      {children}
    </Tabs>
  );
}
