import React from 'react';
import { Text } from 'react-native';

import { ConfirmResetPasswordComponent } from './types';
import { DefaultFooter } from '../../common/DefaultFooter';
import { DefaultHeader } from '../../common/DefaultHeader';

const ConfirmResetPassword: ConfirmResetPasswordComponent = () => {
  return <Text>ConfirmResetPassword</Text>;
};

ConfirmResetPassword.Header = DefaultHeader;
ConfirmResetPassword.Footer = DefaultFooter;
ConfirmResetPassword.FormFields = function FormFields() {
  return null;
};

ConfirmResetPassword.displayName = 'ConfirmResetPassword';
export default ConfirmResetPassword;
