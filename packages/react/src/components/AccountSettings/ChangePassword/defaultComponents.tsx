import React from 'react';
import { Alert, Button, PasswordField } from '../../../primitives';
import {
  AccountSettingsError,
  AccountSettingsPasswordField,
  AccountSettingsSubmitButton,
} from '../types';

/** ChangePassword subcomponents */
// TODO: enable component override
export const DefaultCurrentPassword: AccountSettingsPasswordField = (props) => {
  return <PasswordField {...props} />;
};

export const DefaultNewPassword: AccountSettingsPasswordField = (props) => {
  return <PasswordField {...props} />;
};

export const DefaultSubmitButton: AccountSettingsSubmitButton = (props) => {
  const { children, ...rest } = props;
  return <Button {...rest}>{children}</Button>;
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
