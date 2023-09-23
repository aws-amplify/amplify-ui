export const defaultChangePasswordDisplayText = {
  currentPasswordLabel: 'Current Password',
  newPasswordLabel: 'New Password',
  confirmPasswordLabel: 'Confirm Password',
  updatePasswordText: 'Update password',
};

export type ChangePasswordDisplayText = typeof defaultChangePasswordDisplayText;

export const defaultDeleteUserDisplayText = {
  deleteAccountText: 'Delete Account',
  warningText:
    'Deleting your account is not reversible. You will lose access to your account and all data associated with it.',
  cancelText: 'Cancel',
  deleteMyAccountText: 'Delete my account',
};

export type DeleteUserDisplayText = typeof defaultDeleteUserDisplayText;
