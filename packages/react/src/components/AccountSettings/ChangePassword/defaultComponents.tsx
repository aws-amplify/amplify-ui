import React from 'react';
import { translate } from '@aws-amplify/ui';
import { Alert, Button, PasswordField } from '../../../primitives';
import {
  AccountSettingsError,
  AccountSettingsPasswordField,
  AccountSettingsSubmitButton,
} from '../types';

export const DefaultCurrentPassword: AccountSettingsPasswordField = (props) => {
  // TODO: add AccountSettingsTextUtil to collect these strings
  const label = translate('Current Password');

  return (
    <PasswordField
      label={label}
      name="currentPassword"
      autoComplete="current-password"
      isRequired
      {...props}
    />
  );
};

export const DefaultNewPassword: AccountSettingsPasswordField = (props) => {
  const label = translate('New Password');

  return (
    <PasswordField
      label={label}
      name="newPassword"
      autoComplete="new-password"
      isRequired
      {...props}
    />
  );
};

export const DefaultSubmitButton: AccountSettingsSubmitButton = (props) => {
  const updatePasswordText = translate('Update password');

  return (
    <Button type="submit" {...props}>
      {updatePasswordText}
    </Button>
  );
};

export const DefaultError: AccountSettingsError = (props) => {
  const { errorMessage, ...rest } = props;

  if (!errorMessage) return null;
  return (
    <Alert variation="error" {...rest}>
      {errorMessage}
    </Alert>
  );
};
