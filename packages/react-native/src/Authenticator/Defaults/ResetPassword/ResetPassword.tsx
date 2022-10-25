import React from 'react';
import { Text } from 'react-native';

import { DefaultFooter } from '../../common/DefaultFooter';
import { DefaultHeader } from '../../common/DefaultHeader';
import { DefaultFormFields } from '../../common/DefaultFormFields';
import { DefaultResetPasswordComponent } from '../types';

const ResetPassword: DefaultResetPasswordComponent = () => {
  return <Text>ResetPassword</Text>;
};

ResetPassword.Footer = DefaultFooter;
ResetPassword.FormFields = DefaultFormFields;
ResetPassword.Header = DefaultHeader;

ResetPassword.displayName = 'ResetPassword';
export default ResetPassword;
