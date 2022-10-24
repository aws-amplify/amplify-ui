import React from 'react';
import { Text } from 'react-native';

import { DefaultHeader } from '../../common/DefaultHeader';
import { DefaultFormFields } from '../FormFields';
import { DefaultConfirmResetPasswordComponent } from '../types';

const ConfirmResetPassword: DefaultConfirmResetPasswordComponent = () => {
  return <Text>ConfirmResetPassword</Text>;
};

ConfirmResetPassword.Footer = function Footer() {
  return null;
};
ConfirmResetPassword.FormFields = DefaultFormFields;
ConfirmResetPassword.Header = DefaultHeader;

ConfirmResetPassword.displayName = 'ConfirmResetPassword';
export default ConfirmResetPassword;
