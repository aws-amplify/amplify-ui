import React from 'react';

import { Amplify } from 'aws-amplify';

import {
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

const components = {
  CurrentPasswordField: (props) => (
    <AccountSettings.ChangePassword.CurrentPasswordField
      {...props}
      label="Custom Current Password Label"
    />
  ),
  NewPasswordField: (props) => (
    <AccountSettings.ChangePassword.NewPasswordField
      {...props}
      label="Custom New Password Label"
    />
  ),
};

function App({ signOut }) {
  return (
    <Card width="800px">
      <Flex direction="column">
        <Card variation="outlined">
          <Flex direction="column">
            <Heading>Change Password:</Heading>
            <AccountSettings.ChangePassword components={components} />
          </Flex>
        </Card>
        <Button onClick={signOut}>Sign Out</Button>
      </Flex>
    </Card>
  );
}

export default withAuthenticator(App);
