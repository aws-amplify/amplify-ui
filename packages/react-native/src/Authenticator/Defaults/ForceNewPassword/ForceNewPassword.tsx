import React from 'react';
import { Text } from 'react-native';

import { ForceNewPasswordComponent } from './types';
import { DefaultHeader } from '../../common/DefaultHeader';

const ForceNewPassword: ForceNewPasswordComponent = () => {
  return <Text>ForceNewPassword</Text>;
};

ForceNewPassword.Header = DefaultHeader;

ForceNewPassword.Footer = function Footer() {
  return null;
};
ForceNewPassword.FormFields = function FormFields() {
  return null;
};

ForceNewPassword.displayName = 'ForceNewPassword';
export default ForceNewPassword;
