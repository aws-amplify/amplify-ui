import React from 'react';

import { Amplify } from 'aws-amplify';

import {
  Alert,
  Button,
  Card,
  Flex,
  Heading,
  AccountSettings,
  withAuthenticator,
} from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import awsExports from './aws-exports';
Amplify.configure(awsExports);

function App({ signOut }) {
  const [isSuccessful, setIsSuccessful] = React.useState(false);

  return (
    <Card width="800px">
      <Flex direction="column">
        <Card variation="outlined">
          <Flex direction="column">
            <Heading>Change Password:</Heading>
            <AccountSettings.ChangePassword
              onSuccess={() => {
                setIsSuccessful(true);
              }}
            />
            {isSuccessful ? (
              <Alert variation="success" isDismissible>
                Password has been changed successfully.
              </Alert>
            ) : null}
          </Flex>
        </Card>
        <Button onClick={signOut}>Sign Out</Button>
      </Flex>
    </Card>
  );
}

export default withAuthenticator(App);
