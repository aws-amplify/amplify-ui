import React from 'react';
import { Button, PasswordField } from '../../../primitives';
import { ValidationErrors } from '../../shared/ValidationErrors';
import { DefaultError } from '../shared/Defaults';
import { PasswordFieldComponent } from '../types';
import { ChangePasswordComponents } from './types';

const DefaultPasswordField: PasswordFieldComponent = ({
  label,
  validationErrors,
  ...rest
}) => {
  return (
    <>
      <PasswordField label={label} {...rest} />
      <ValidationErrors errors={validationErrors} />
    </>
  );
};

const DEFAULTS: Required<ChangePasswordComponents> = {
  CurrentPassword: DefaultPasswordField,
  NewPassword: DefaultPasswordField,
  ConfirmPassword: DefaultPasswordField,
  SubmitButton: Button,
  Error: DefaultError,
};

export default DEFAULTS;
