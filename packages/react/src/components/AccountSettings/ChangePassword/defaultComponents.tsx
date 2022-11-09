import React from 'react';
import { Alert, Button, PasswordField } from '../../../primitives';
import { ValidationErrors } from '../../shared/ValidationErrors';
import {
  AccountSettingsError,
  AccountSettingsPasswordField,
  AccountSettingsSubmitButton,
} from '../types';

/** ChangePassword subcomponents */
// TODO: enable component override
export const DefaultPasswordField: AccountSettingsPasswordField = ({
  validationErrors,
  ...rest
}) => {
  return (
    <>
      <PasswordField {...rest} />
      <ValidationErrors errors={validationErrors} />
    </>
  );
};

export const DefaultSubmitButton: AccountSettingsSubmitButton = ({
  children,
  ...rest
}) => {
  return <Button {...rest}>{children}</Button>;
};

export const DefaultError: AccountSettingsError = ({ children, ...rest }) => {
  return (
    <Alert variation="error" {...rest}>
      {children}
    </Alert>
  );
};
