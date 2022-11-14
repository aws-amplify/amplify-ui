import React from 'react';

import { Amplify } from 'aws-amplify';

import {
  Authenticator,
  Button,
  Card,
  Flex,
  Heading,
} from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import { Alert, ConfigureTOTP } from '@aws-amplify/ui-react';

import awsExports from './aws-exports';
Amplify.configure(awsExports);

export default function App() {
  const [isSuccessful, setIsSuccessful] = React.useState(false);
  console.log(isSuccessful);
  return (
    <Authenticator>
      {({ signOut }) => (
        <Card width="800px">
          <Flex direction="column">
            <Card variation="outlined">
              <Flex direction="column">
                <Heading>Setup MFA:</Heading>
                <ConfigureTOTP
                  onSuccess={() => {
                    setIsSuccessful(true);
                  }}
                />
                {isSuccessful ? (
                  <Alert variation="success" isDismissible>
                    TOTP has been set up successfully
                  </Alert>
                ) : null}
              </Flex>
            </Card>
            <Button onClick={signOut}>Sign Out</Button>
          </Flex>
        </Card>
      )}
    </Authenticator>
  );
}
