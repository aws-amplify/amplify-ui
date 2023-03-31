import * as React from 'react';
import {
  AmplifyProvider,
  Button,
  Card,
  Heading,
  withAuthenticator,
  useAuthenticator,
} from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { Amplify } from 'aws-amplify';
import aws_exports from '../../../../environments/auth-with-email/src/aws-exports.js';
import { FaceLivenessDetector } from '@aws-amplify/ui-react-liveness';
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
      <FaceLivenessDetector
        sessionId={'123'}
        region={'us-east-1'}
        handleGetLivenessDetection={async () => {}}
      />
    </AmplifyProvider>
  );
}

export default withAuthenticator(App);
