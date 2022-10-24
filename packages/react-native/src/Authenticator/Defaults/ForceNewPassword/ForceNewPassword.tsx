import React from 'react';
import { Text } from 'react-native';

import { ForceNewPasswordComponent } from './types';
import { DefaultFooter } from '../../common/DefaultFooter';
import { DefaultHeader } from '../../common/DefaultHeader';

const ForceNewPassword: ForceNewPasswordComponent = () => {
  return <Text>ForceNewPassword</Text>;
};

ForceNewPassword.Header = DefaultHeader;
ForceNewPassword.Footer = DefaultFooter;
ForceNewPassword.FormFields = function FormFields() {
  return null;
};

ForceNewPassword.displayName = 'ForceNewPassword';
export default ForceNewPassword;
