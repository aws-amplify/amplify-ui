import {
  AmplifyProvider,
  Button,
  Card,
  Heading,
  withAuthenticator,
  useAuthenticator,
} from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import Amplify from 'aws-amplify';
import aws_exports from '../../../../environments/auth-with-email/src/aws-exports.js';
Amplify.configure(aws_exports);

function App() {
  const { signOut } = useAuthenticator();
  return (
    <AmplifyProvider colorMode="dark">
      <Card>
        <Heading>Amplify Sample App</Heading>
        <Button variation="primary">Click me!</Button>
        <Button onClick={signOut}>Sign out</Button>
      </Card>
    </AmplifyProvider>
  );
}

export default withAuthenticator(App);
