import { Amplify } from 'aws-amplify';

import {
  Authenticator,
  Button,
  Card,
  Flex,
  AccountSettings,
} from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

const amplifyOutputs = (
  await import(`@environments/auth/auth-with-email/${process.env.PATH}`)
).default;

Amplify.configure(amplifyOutputs);

export default function App() {
  return (
    <Authenticator>
      {({ signOut, user }) => (
        <Card width="800px">
          <h1>Hello {user?.username}</h1>
          <Flex direction="column">
            <AccountSettings.DeleteUser
              displayText={{
                cancelButtonText: 'Cancel!',
                confirmDeleteButtonText: 'Are you sure?',
                deleteAccountButtonText: 'Delete!',
                warningText: "Maybe don't do it",
              }}
            />
            <Button onClick={signOut}>Sign Out</Button>
          </Flex>
        </Card>
      )}
    </Authenticator>
  );
}
