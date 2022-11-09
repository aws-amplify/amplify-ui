import React from 'react';
import { Card, Flex, Text, Button, Alert } from '../../../primitives';
import { AccountSettingsError } from '../types';

import { DeleteUserWarningProps } from './types';

export const DefaultConfirmation = ({
  onCancel,
  onConfirmDelete,
  isInProgress,
}: DeleteUserWarningProps): JSX.Element => {
  return (
    <Card>
      <Flex direction="column">
        <Text color="font.error">
          Deleting your account is not reversable. You will lose access to your
          account and all data associated with it.
        </Text>
        <Flex direction="row">
          <Button variation="link" onClick={onCancel} isDisabled={isInProgress}>
            Cancel
          </Button>
          <Button
            variation="primary"
            onClick={onConfirmDelete}
            isDisabled={isInProgress}
          >
            Delete my account
          </Button>
        </Flex>
      </Flex>
    </Card>
  );
};

export const DefaultError: AccountSettingsError = ({ children, ...rest }) => {
  return (
    <Alert variation="error" {...rest}>
      {children}
    </Alert>
  );
};
