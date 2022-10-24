import React from 'react';
import { Text } from 'react-native';

import { ResetPasswordComponent } from './types';
import { DefaultFooter } from '../../common/DefaultFooter';
import { DefaultHeader } from '../../common/DefaultHeader';

const ResetPassword: ResetPasswordComponent = () => {
  return <Text>ResetPassword</Text>;
};

ResetPassword.Header = DefaultHeader;
ResetPassword.Footer = DefaultFooter;
ResetPassword.FormFields = function FormFields() {
  return null;
};

ResetPassword.displayName = 'ResetPassword';
export default ResetPassword;
