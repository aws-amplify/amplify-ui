import { translations } from '@aws-amplify/ui';
import {
  Authenticator,
  Loader,
  useAuthenticator,
  View,
} from '@aws-amplify/ui-react';

import { I18n } from 'aws-amplify/utils';
import * as React from 'react';

type ScreenProps = {
  Component: React.JSX.Element;
};

function Screen({ Component }: ScreenProps) {
  // Used to render the component when side-effects happen
  const { route } = useAuthenticator();

  React.useEffect(() => {
    I18n.putVocabulariesForLanguage('en', {
      // Sign In screen
      'Sign In': 'Login', // Tab header
      'Sign in': 'Log in', // Button label
      'Sign in to your account': 'Welcome Back!', // Header text
      Username: 'Enter your username', // Username label
      Password: 'Enter your password', // Password label
      'Forgot your password?': 'Reset Password',

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

    return () => {
      I18n.putVocabulariesForLanguage('en', translations['en']);
    };
  }, []);

  if (route === 'idle') {
    return <Loader variation="linear" />;
  }

  if (!Component) {
    throw new Error(
      'Component is not defined. Please check the component name'
    );
  }

  return Component;
}

export function LabelsAndTextDemo({ Component }: ScreenProps) {
  return (
    <Authenticator.Provider>
      <View data-amplify-authenticator="">
        <View data-amplify-container="">
          <View data-amplify-body>
            <Screen Component={Component} />
          </View>
        </View>
      </View>
    </Authenticator.Provider>
  );
}
