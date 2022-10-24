import React from 'react';
import { Text } from 'react-native';

import { DefaultHeader } from '../../common/DefaultHeader';
import { DefaultFormFields } from '../FormFields';
import { DefaultForceNewPasswordComponent } from '../types';

const ForceNewPassword: DefaultForceNewPasswordComponent = () => {
  return <Text>ForceNewPassword</Text>;
};

ForceNewPassword.Footer = function Footer() {
  return null;
};
ForceNewPassword.FormFields = DefaultFormFields;
ForceNewPassword.Header = DefaultHeader;

ForceNewPassword.displayName = 'ForceNewPassword';
export default ForceNewPassword;
