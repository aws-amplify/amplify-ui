import React from 'react';
import { Text } from 'react-native';

import { ForceNewPasswordComponent } from './types';

const ForceNewPassword: ForceNewPasswordComponent = () => {
  return <Text>ForceNewPassword</Text>;
};

ForceNewPassword.Header = function Header() {
  return null;
};
ForceNewPassword.Footer = function Footer() {
  return null;
};
ForceNewPassword.FormFields = function FormFields() {
  return null;
};

ForceNewPassword.displayName = 'ForceNewPassword';
export default ForceNewPassword;
