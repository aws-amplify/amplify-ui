import type { DisplayTextTemplate } from '@aws-amplify/ui';

// ChangePassword
export type ChangePasswordDisplayText = DisplayTextTemplate<{
  confirmPasswordFieldLabel?: string;
  currentPasswordFieldLabel?: string;
  newPasswordFieldLabel?: string;
  updatePasswordButtonText?: string;
}>;

type ChangePasswordDisplayTextDefault = Required<ChangePasswordDisplayText>;

export const defaultChangePasswordDisplayText: ChangePasswordDisplayTextDefault =
  {
    confirmPasswordFieldLabel: 'Confirm Password',
    currentPasswordFieldLabel: 'Current Password',
    newPasswordFieldLabel: 'New Password',
    updatePasswordButtonText: 'Update password',
  };

// DeleteUser
export type DeleteUserDisplayText = DisplayTextTemplate<{
  cancelButtonText?: string;
  confirmDeleteButtonText?: string;
  deleteAccountButtonText?: string;
  warningText?: string;
}>;

type DeleteUserDisplayTextDefault = Required<DeleteUserDisplayText>;

export const defaultDeleteUserDisplayText: DeleteUserDisplayTextDefault = {
  cancelButtonText: 'Cancel',
  confirmDeleteButtonText: 'Delete',
  deleteAccountButtonText: 'Delete Account',
  warningText:
    'Deleting your account is not reversible. You will lose access to your account and all data associated with it.',
};
