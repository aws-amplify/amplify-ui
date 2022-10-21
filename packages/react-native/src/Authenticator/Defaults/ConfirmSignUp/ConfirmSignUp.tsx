import React from 'react';
import { Text } from 'react-native';

import { ConfirmSignUpComponent } from './types';
import { DefaultHeader } from '../../common/DefaultHeader';

const ConfirmSignUp: ConfirmSignUpComponent = () => {
  return <Text>ConfirmSignUp</Text>;
};

ConfirmSignUp.Header = function Header() {
  return <DefaultHeader>Confirm Sign Up</DefaultHeader>;
};
ConfirmSignUp.Footer = function Footer() {
  return null;
};
ConfirmSignUp.FormFields = function FormFields() {
  return null;
};

ConfirmSignUp.displayName = 'ConfirmSignUp';
export default ConfirmSignUp;
