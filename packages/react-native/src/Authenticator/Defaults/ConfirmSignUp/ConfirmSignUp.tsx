import React from 'react';
import { Text } from 'react-native';

import { ConfirmSignUpComponent } from './types';

const ConfirmSignUp: ConfirmSignUpComponent = () => {
  return <Text>ConfirmSignUp</Text>;
};

ConfirmSignUp.Header = function Header() {
  return null;
};
ConfirmSignUp.Footer = function Footer() {
  return null;
};
ConfirmSignUp.FormFields = function FormFields() {
  return null;
};

ConfirmSignUp.displayName = 'ConfirmSignUp';
export default ConfirmSignUp;
