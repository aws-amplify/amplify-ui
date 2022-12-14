export const CHANGE_PASSWORD = [
  {
    name: `onSuccess?`,
    description:
      'Callback function triggered when password is successfully updated',
    type: `() => void`,
  },
  {
    name: `onError?`,
    description: 'Callback function triggered when change password fails',
    type: `(error: Error) => void`,
  },
  {
    name: `validators?`,
    description: 'Custom password validations',
    type: `ValidatorOptions[]`,
  },
  {
    name: `components?`,
    description: 'Submit button',
    type: `ChangePasswordComponents`,
  },
];

export const OVERRIDES = [
  {
    name: `CurrentPasswordField?`,
    description: 'Password field for current password',
    type: `PasswordFieldProps`,
  },
  {
    name: `NewPasswordField?`,
    description: 'Password field for new password',
    type: `PasswordFieldProps`,
  },
  {
    name: `ConfirmPasswordField?`,
    description: 'Password field for confirm password',
    type: `PasswordFieldProps`,
  },
  {
    name: `ErrorMessage?`,
    description: 'Error alert that displays on change password errors',
    type: `ErrorMessageComponentProps`,
  },
  {
    name: `SubmitButton?`,
    description: 'Submit button',
    type: `SubmitButtonProps`,
  },
];

export const PASSWORD_FIELDS = [
  {
    name: `onBlur`,
    description:
      'Blur handler for the input. This must be passed to your input element.',
    type: `React.FocusEventHandler<HTMLInputElement>`,
  },
  {
    name: `onChange`,
    description:
      'Change handler for the input. This must be passed to your input element.',
    type: `React.ChangeEventHandler<HTMLInputElement>`,
  },
  {
    name: `name`,
    description:
      'HTML name for the input. This must be passed to your input element.',
    type: `React.ChangeEventHandler<HTMLInputElement>`,
  },
  {
    name: `fieldValidationErrors?`,
    description: 'List of validation errors for the password field.',
    type: `string[]`,
  },
];

export const SUBMIT_BUTTON = [
  {
    name: `isDisabled`,
    description:
      'Boolean representing whether account deletion is in progress. Your delete button should be disabled if this is set to true.',
    type: `boolean`,
  },
];
