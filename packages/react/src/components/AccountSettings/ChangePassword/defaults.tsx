import React from 'react';
import { Button, PasswordField } from '../../../primitives';
import { ValidationErrors } from '../../shared/ValidationErrors';
import { DefaultErrorMessage } from '../shared/Defaults';
import { PasswordFieldComponent } from '../types';
import { ChangePasswordComponents } from './types';

const DefaultPasswordField: PasswordFieldComponent = ({
  fieldValidationErrors,
  label,
  ...rest
}) => {
  return (
    <>
      <PasswordField {...rest} label={label} />
      <ValidationErrors errors={fieldValidationErrors} />
    </>
  );
};

const DEFAULTS: Required<ChangePasswordComponents> = {
  CurrentPasswordField: DefaultPasswordField,
  NewPasswordField: DefaultPasswordField,
  ConfirmPasswordField: DefaultPasswordField,
  SubmitButton: Button,
  ErrorMessage: DefaultErrorMessage,
};

export default DEFAULTS;
