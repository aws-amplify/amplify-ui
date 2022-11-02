import React from 'react';
import { translate } from '@aws-amplify/ui';
import { PasswordField } from '../../../primitives';
import { PasswordFieldOverride } from '../types';

export const DefaultCurrentPassword: PasswordFieldOverride = () => {
  const label = translate('Current Password');

  return <PasswordField label={label} />;
};

export const DefaultNewPassword: PasswordFieldOverride = () => {
  const label = translate('New Password');

  return <PasswordField label={label} />;
};

export const DefaultConfirmPassword: PasswordFieldOverride = () => {
  const label = translate('Confirm Password');

  return <PasswordField label={label} />;
};
