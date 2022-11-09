import { translate } from '@aws-amplify/ui';
import React from 'react';

import { Card, Flex, Text, Button, Alert } from '../../../primitives';
import { AccountSettingsError, AccountSettingsSubmitButton } from '../types';
import { DeleteUserWarningProps } from './types';

export const DefaultSubmitButton: AccountSettingsSubmitButton = ({
  children,
  ...rest
}) => {
  return <Button {...rest}>{children}</Button>;
};

export const DefaultWarning = ({
  onCancel,
  onConfirmDelete,
  isInProgress,
}: DeleteUserWarningProps): JSX.Element => {
  // translations
  // TODO: consolodiate translations to accountSettingsTextUtil
  const warningText = translate(
    'Deleting your account is not reversable. You will lose access to your account and all data associated with it.'
  );
  const cancelText = translate('Cancel');
  const deleteMyAccountText = translate('Delete my account');

  return (
    <Card>
      <Flex direction="column">
        <Text color="font.error">{warningText}</Text>
        <Flex direction="row">
          <Button variation="link" onClick={onCancel} isDisabled={isInProgress}>
            {cancelText}
          </Button>
          <Button
            variation="primary"
            onClick={onConfirmDelete}
            isDisabled={isInProgress}
          >
            {deleteMyAccountText}
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
