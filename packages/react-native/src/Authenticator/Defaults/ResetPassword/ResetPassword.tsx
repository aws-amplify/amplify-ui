import React from 'react';
import { Text } from 'react-native';

import { ResetPasswordComponent } from './types';

const ResetPassword: ResetPasswordComponent = () => {
  return <Text>ResetPassword</Text>;
};

ResetPassword.Header = function Header() {
  return null;
};
ResetPassword.Footer = function Footer() {
  return null;
};
ResetPassword.FormFields = function FormFields() {
  return null;
};

ResetPassword.displayName = 'ResetPassword';
export default ResetPassword;
