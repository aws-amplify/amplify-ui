import React from 'react';
import { Button, PasswordField } from '../../../primitives';
import { ValidationErrors } from '../../shared/ValidationErrors';
import { DefaultErrorMessage } from '../shared/Defaults';
import { PasswordFieldComponent, SubmitButtonComponent } from '../types';
import { ChangePasswordComponents } from './types';

const DefaultPasswordField: PasswordFieldComponent = ({
  fieldValidationErrors,
  label,
  ...rest
}) => {
  return (
    <>
      <PasswordField {...rest} label={label} />
      {fieldValidationErrors ? (
        <ValidationErrors errors={fieldValidationErrors} />
      ) : null}
    </>
  );
};

const DefaultSubmitButton: SubmitButtonComponent = (props) => (
  <Button {...props} />
);

const DEFAULTS: Required<ChangePasswordComponents> = {
  CurrentPasswordField: DefaultPasswordField,
  NewPasswordField: DefaultPasswordField,
  ConfirmPasswordField: DefaultPasswordField,
  SubmitButton: DefaultSubmitButton,
  ErrorMessage: DefaultErrorMessage,
};

export default DEFAULTS;
