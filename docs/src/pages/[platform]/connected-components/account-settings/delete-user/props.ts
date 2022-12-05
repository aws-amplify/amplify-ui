export const DELETE_USER = [
  {
    name: `onSuccess?`,
    description:
      'Callback function triggered once user account is successfully deleted',
    type: `() => void`,
  },
  {
    name: `onError?`,
    description: 'Callback function triggered when account deletion fails',
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
    name: `DeleteButton?`,
    description: 'Delete button',
    type: `DeleteButtonProps`,
  },
  {
    name: `ErrorMessage?`,
    description: 'Error alert that displays on delete user errors',
    type: `ErrorMessageComponentProps`,
  },
  {
    name: `WarningView?`,
    description: 'Warning view that asks end user to confirm account deletion',
    type: `PasswordFieldProps`,
  },
];

export const DELETE_BUTTON = [
  {
    name: `onClick`,
    description:
      'Click handler for the button. This must be passed to your button element.',
    type: `React.MouseEventHandler<HTMLButtonElement>`,
  },
  {
    name: `isDisabled`,
    description: 'Boolean whether delete button should be disabled',
    type: `boolean`,
  },
];

export const WARNING = [
  {
    name: `onCancel`,
    description:
      'Callback function triggered when end user cancels account deletion',
    type: `() => void`,
  },
  {
    name: `onConfirm`,
    description: 'Callback function triggered when user confirms account deletion',
    type: `() => void`,
  },
  {
    name: `isDisabled`,
    description: 'Whether account deletion is in progress',
    type: `boolean`,
  },
];
