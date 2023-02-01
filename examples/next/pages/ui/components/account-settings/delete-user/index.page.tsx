import { Amplify } from 'aws-amplify';

import {
  Authenticator,
  Button,
  Card,
  Flex,
  Heading,
  AccountSettings,
} from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import awsExports from './aws-exports';
Amplify.configure(awsExports);

export default function App() {
  return (
    <Authenticator>
      {({ signOut, user }) => (
        <Card width="800px">
          <h1>Hello {user.attributes.email}</h1>
          <Flex direction="column">
            <Card variation="outlined">
              <Heading>Delete Account:</Heading>
              <AccountSettings.DeleteUser />
            </Card>
            <Button onClick={signOut}>Sign Out</Button>
          </Flex>
        </Card>
      )}
    </Authenticator>
  );
}
