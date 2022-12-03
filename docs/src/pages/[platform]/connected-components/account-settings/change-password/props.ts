export const CHANGE_PASSWORD = [
  {
    name: `onSuccess?`,
    description:
      'Callback that is called once password is successfully updated ',
    type: `() => void`,
  },
  {
    name: `onError?`,
    description: 'Callback that is called when change password fails',
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
    description: 'Error alert that displays on delete user errors',
    type: `ErrorMessageComponentProps`,
  },
  {
    name: `SubmitButton?`,
    description: 'Submit button',
    type: `SubmitButtonProps`,
  },
];
