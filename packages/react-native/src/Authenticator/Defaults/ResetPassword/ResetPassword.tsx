import React from 'react';
import { Text } from 'react-native';

import { ResetPasswordComponent } from './types';
import { DefaultHeader } from '../../common/DefaultHeader';

const ResetPassword: ResetPasswordComponent = () => {
  return <Text>ResetPassword</Text>;
};

ResetPassword.Header = function Header() {
  return <DefaultHeader>Reset Password</DefaultHeader>;
};
ResetPassword.Footer = function Footer() {
  return null;
};
ResetPassword.FormFields = function FormFields() {
  return null;
};

ResetPassword.displayName = 'ResetPassword';
export default ResetPassword;
