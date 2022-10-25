import React from 'react';
import { Text } from 'react-native';

import { DefaultFooter } from '../../common/DefaultFooter';
import { DefaultHeader } from '../../common/DefaultHeader';
import { DefaultFormFields } from '../../common/DefaultFormFields';
import { DefaultConfirmResetPasswordComponent } from '../types';

const ConfirmResetPassword: DefaultConfirmResetPasswordComponent = () => {
  return <Text>ConfirmResetPassword</Text>;
};

ConfirmResetPassword.Footer = DefaultFooter;
ConfirmResetPassword.FormFields = DefaultFormFields;
ConfirmResetPassword.Header = DefaultHeader;

ConfirmResetPassword.displayName = 'ConfirmResetPassword';
export default ConfirmResetPassword;
