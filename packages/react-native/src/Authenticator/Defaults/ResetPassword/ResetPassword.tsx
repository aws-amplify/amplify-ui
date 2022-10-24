import React from 'react';
import { Text } from 'react-native';

import { DefaultHeader } from '../../common/DefaultHeader';
import { DefaultFormFields } from '../FormFields';
import { DefaultResetPasswordComponent } from '../types';

const ResetPassword: DefaultResetPasswordComponent = () => {
  return <Text>ResetPassword</Text>;
};

ResetPassword.Footer = function Footer() {
  return null;
};
ResetPassword.FormFields = DefaultFormFields;
ResetPassword.Header = DefaultHeader;

ResetPassword.displayName = 'ResetPassword';
export default ResetPassword;
