import React from 'react';
import { Amplify } from 'aws-amplify';

import {
  Authenticator,
  Button,
  Card,
  Flex,
  Heading,
  AccountSettings,
  Text,
  TextField,
} from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import awsExports from './aws-exports';
Amplify.configure(awsExports);

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
          Deleting your account is not reversable. Please type "delete" below if
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

const components = { Warning: CustomWarning };

export default function App() {
  return (
    <Authenticator>
      {({ signOut }) => (
        <Card width="800px">
          <Flex direction="column">
            <Card variation="outlined">
              <Heading>Delete Account:</Heading>
              <AccountSettings.DeleteUser components={components} />
            </Card>
            <Button onClick={signOut}>Sign Out</Button>
          </Flex>
        </Card>
      )}
    </Authenticator>
  );
}
