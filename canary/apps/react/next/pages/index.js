import {
  AmplifyProvider,
  Button,
  Card,
  Heading,
  withAuthenticator,
} from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import Amplify from 'aws-amplify';
Amplify.configure({});

function App() {
  return (
    <AmplifyProvider colorMode="dark">
      <Card>
        <Heading>Amplify Sample App</Heading>
        <Button variation="primary">Click me!</Button>
      </Card>
    </AmplifyProvider>
  );
}

export default withAuthenticator(App);
