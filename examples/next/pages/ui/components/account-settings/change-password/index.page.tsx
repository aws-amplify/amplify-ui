import React from 'react';

import { Amplify } from 'aws-amplify';
import {
  Authenticator,
  ChangePassword,
  Button,
  Card,
  Flex,
  withAuthenticator,
  Alert,
} from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import awsExports from './aws-exports';
Amplify.configure(awsExports);

const App = ({ signOut }) => {
  const [isPasswordChanged, setIsPasswordChanged] = React.useState(false);
  const handleSuccess = () => {
    setIsPasswordChanged(true);
  };

  return (
    <Card
      backgroundColor="white"
      width="500px"
      margin="xxl"
      variation="elevated"
    >
      <Flex direction="column">
        <ChangePassword onSuccess={handleSuccess} />
        {isPasswordChanged ? (
          <Alert isDismissible variation="info">
            Password is successfully changed!
          </Alert>
        ) : null}
        <Button onClick={signOut}>Sign Out</Button>
      </Flex>
    </Card>
  );
};

export default withAuthenticator(App);
