import { translations } from '@aws-amplify/ui';
import {
  Authenticator,
  Loader,
  useAuthenticator,
  View,
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
  // Used to render the component when side-effects happen
  const [version, setVersion] = React.useState(0);
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

    setVersion(version + 1);

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

  return <Component key={version} />;
}

export function LabelsAndTextDemo({ Component }: ScreenProps) {
  const OnMachineInit = ({ children }) => {
    /**
     * This waits for Authenticator machine to init before its inner components
     * start consuming machine context.
     */
    const { route, _send } = useAuthenticator();
    React.useEffect(() => {
      if (route === 'idle') {
        _send('INIT', { data: {} });
      }
    }, []);
    if (!route || route === 'idle' || route === 'setup') return null;

    return <>{children}</>;
  };

  return (
    <Authenticator.Provider>
      <OnMachineInit>
        <View data-amplify-authenticator="">
          <View data-amplify-container="">
            <View data-amplify-body>
              <Screen Component={Component} />
            </View>
          </View>
        </View>
      </OnMachineInit>
    </Authenticator.Provider>
  );
}
