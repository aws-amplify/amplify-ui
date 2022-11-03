import React from 'react';
import { translate } from '@aws-amplify/ui';
import { PasswordField } from '../../../primitives';
import { PasswordFieldOverride } from '../types';

export const DefaultCurrentPassword: PasswordFieldOverride = (props) => {
  const label = translate('Current Password');

  return (
    <PasswordField
      label={label}
      name="currentPassword"
      autoComplete="current-password"
      isRequired
      {...props}
    />
  );
};

export const DefaultNewPassword: PasswordFieldOverride = (props) => {
  const label = translate('New Password');

  return (
    <PasswordField
      label={label}
      name="newPassword"
      autoComplete="new-password"
      isRequired
      {...props}
    />
  );
};
