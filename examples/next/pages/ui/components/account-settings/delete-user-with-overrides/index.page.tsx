import React from 'react';
import { Amplify } from 'aws-amplify';
import { signOut } from 'aws-amplify/auth';

import {
  AccountSettings,
  Button,
  Card,
  Flex,
  Heading,
  Text,
  TextField,
  withAuthenticator,
} from '@aws-amplify/ui-react';

import awsExports from './aws-exports';

Amplify.configure(awsExports);

const handleSignOut = () => {
  signOut();
};

function CustomWarning({ onCancel, onConfirm, isDisabled }) {
  const [value, setValue] = React.useState('');

  const handleChange = (event) => {
    event.preventDefault();

    const { value } = event.target;
    setValue(value);
  };

  return (
    <form>
      <Flex direction="column">
        <Text variation="warning">
          Deleting your account is not reversable. Please type delete below if
          you want to confirm user deletion.
        </Text>
        <TextField
          labelHidden
          label="Confirm Account Deletion"
          placeholder="delete"
          onChange={handleChange}
          value={value}
        />
        <Button onClick={onCancel}>Back</Button>
        <Button
          onClick={onConfirm}
          variation="primary"
          isDisabled={isDisabled || value !== 'delete'}
        >
          Submit
        </Button>
      </Flex>
    </form>
  );
}

const components = { WarningView: CustomWarning };

function App() {
  return (
    <Card variation="outlined" width="800px">
      <Flex direction="column">
        <Heading>Delete Account:</Heading>
        <AccountSettings.DeleteUser components={components} />
        <Button onClick={handleSignOut}>Sign Out</Button>
      </Flex>
    </Card>
  );
}

export default withAuthenticator(App);
