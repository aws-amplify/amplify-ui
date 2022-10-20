import React from 'react';
import { Text } from 'react-native';

import { ConfirmResetPasswordComponent } from './types';

const ConfirmResetPassword: ConfirmResetPasswordComponent = () => {
  return <Text>ConfirmResetPassword</Text>;
};

ConfirmResetPassword.Header = function Header() {
  return null;
};
ConfirmResetPassword.Footer = function Footer() {
  return null;
};
ConfirmResetPassword.FormFields = function FormFields() {
  return null;
};

ConfirmResetPassword.displayName = 'ConfirmResetPassword';
export default ConfirmResetPassword;
