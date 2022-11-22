import React from 'react';
import { Button, PasswordField } from '../../../primitives';
import { ValidationErrors } from '../../shared/ValidationErrors';
import { DefaultError } from '../shared/Defaults';
import { AccountSettingsPasswordField } from '../types';
import { ChangePasswordComponents } from './types';

const DefaultPasswordField: AccountSettingsPasswordField = ({
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

const DEFAULTS: ChangePasswordComponents = {
  CurrentPassword: DefaultPasswordField,
  NewPassword: DefaultPasswordField,
  ConfirmPassword: DefaultPasswordField,
  SubmitButton: Button,
  Error: DefaultError,
};

export default DEFAULTS;
