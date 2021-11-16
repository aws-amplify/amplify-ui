import { Amplify } from 'aws-amplify';

import {
  Authenticator,
  // Amplify UI Primitives to simplify the custom fields
  Button,
  Heading,
  Image,
  Text,
  View,
  // React hook to get access to validation errors
  useAuthenticator,
  useTheme,
} from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import awsExports from '@environments/auth-with-federated/src/aws-exports';
Amplify.configure(awsExports);

const Header = () => {
  const { tokens } = useTheme();

  return (
    <View textAlign="center" padding={`${tokens.space.large}`}>
      <Image
        alt="Amplify logo"
        src="https://docs.amplify.aws/assets/logo-dark.svg"
      />
    </View>
  );
};

const Footer = () => {
  const { tokens } = useTheme();

  return (
    <View textAlign="center" padding={`${tokens.space.large}`}>
      <Text color={`${tokens.colors.neutral['80']}`}>
        &copy; All Rights Reserved
      </Text>
    </View>
  );
};

const SignIn = {
  Header() {
    const { tokens } = useTheme();

    return (
      <Heading padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`} level={3}>
        Sign in to your account
      </Heading>
    );
  },
  Footer() {
    const { toResetPassword } = useAuthenticator();

    return (
      <View textAlign="center">
        <Button
          fontWeight="normal"
          onClick={toResetPassword}
          size="small"
          variation="link"
        >
          Reset Password
        </Button>
      </View>
    );
  },
};

const SignUp = {
  Header() {
    const { tokens } = useTheme();

    return (
      <Heading padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`} level={3}>
        Create a new account
      </Heading>
    );
  },
  Footer() {
    const { toSignIn } = useAuthenticator();

    return (
      <View textAlign="center">
        <Button
          fontWeight="normal"
          onClick={toSignIn}
          size="small"
          variation="link"
        >
          Back to Sign In
        </Button>
      </View>
    );
  },
};

export default function App() {
  return (
    <Authenticator components={{ Header, SignIn, SignUp, Footer }}>
      {({ signOut }) => <button onClick={signOut}>Sign out</button>}
    </Authenticator>
  );
}
