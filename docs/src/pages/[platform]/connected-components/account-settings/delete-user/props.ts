export const DELETE_USER = [
  {
    name: `onSuccess?`,
    description:
      'Callback that is called once user account is successfully deleted ',
    type: `() => void`,
  },
  {
    name: `onError?`,
    description: 'Callback that is called when account deletion fails',
    type: `(error: Error) => void`,
  },
  {
    name: `handleDelete?`,
    description: 'Custom delete user handler',
    type: `(user: AmplifyUser) => Promise<void> | void`,
  },
  {
    name: `components?`,
    description: 'Custom components override',
    type: `DeleteUserComponents`,
  },
];

export const OVERRIDES = [
  {
    name: `Warning?`,
    description:
      'Warning component that asks end user to confirm account deletion',
    type: `PasswordFieldProps`,
  },
  {
    name: `ErrorMessage?`,
    description: 'Error alert that displays on delete user errors',
    type: `ErrorMessageComponentProps`,
  },
  {
    name: `DeleteButton?`,
    description: 'Delete button',
    type: `DeleteButtonProps`,
  },
];

export const DELETE_BUTTON = [
  {
    name: `onClick`,
    description:
      'Click handler for the button. This must be attached to your button element',
    type: `React.MouseEvent<HTMLButtonElement>`,
  },
  {
    name: `isDisabled`,
    description:
      'Boolean representing whether account deletion is in progress. Your delete button should be disabled if this is set to true.',
    type: `boolean`,
  },
];

export const WARNING = [
  {
    name: `onCancel`,
    description:
      'Callback that is called when end user cancels account deletion',
    type: `() => void`,
  },
  {
    name: `onConfirm`,
    description: 'Callback that is ccalled when user confirms account deletion',
    type: `() => void`,
  },
  {
    name: `isDisabled`,
    description: 'Whether account deletion is in progress',
    type: `boolean`,
  },
];
