import { Amplify } from 'aws-amplify';

import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

// Amplify UI Primitives to style the custom components
import {
  Button,
  Heading,
  Image,
  Text,
  View,
  useAuthenticator,
  useTheme,
} from '@aws-amplify/ui-react';

import awsExports from './aws-exports';
Amplify.configure(awsExports);

const components = {
  SignIn: {
    Header() {
      const { tokens } = useTheme();

      return (
        <Heading
          padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
          level={3}
        >
          Sign in to your account
        </Heading>
      );
    },
  },
};

export default function App() {
  return (
    <Authenticator components={components}>
      {({ signOut }) => <button onClick={signOut}>Sign out</button>}
    </Authenticator>
  );
}
