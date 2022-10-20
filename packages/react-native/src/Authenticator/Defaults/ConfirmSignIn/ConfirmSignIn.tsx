import React from 'react';
import { Text } from 'react-native';

import { ConfirmSignInComponent } from './types';

const ConfirmSignIn: ConfirmSignInComponent = () => {
  return <Text>ConfirmSignIn</Text>;
};

ConfirmSignIn.Header = function Header() {
  return null;
};
ConfirmSignIn.Footer = function Footer() {
  return null;
};
ConfirmSignIn.FormFields = function FormFields() {
  return null;
};

ConfirmSignIn.displayName = 'ConfirmSignIn';
export default ConfirmSignIn;
