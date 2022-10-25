import React from 'react';
import { Text } from 'react-native';

import { DefaultFooter } from '../../common/DefaultFooter';
import { DefaultHeader } from '../../common/DefaultHeader';
import { DefaultFormFields } from '../../common/DefaultFormFields';
import { DefaultForceNewPasswordComponent } from '../types';

const ForceNewPassword: DefaultForceNewPasswordComponent = () => {
  return <Text>ForceNewPassword</Text>;
};

ForceNewPassword.Footer = DefaultFooter;
ForceNewPassword.FormFields = DefaultFormFields;
ForceNewPassword.Header = DefaultHeader;

ForceNewPassword.displayName = 'ForceNewPassword';
export default ForceNewPassword;
