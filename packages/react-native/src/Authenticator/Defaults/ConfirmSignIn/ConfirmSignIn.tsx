import React from 'react';
import { Text } from 'react-native';

import { ConfirmSignInComponent } from './types';
import { DefaultHeader } from '../../common/DefaultHeader';

const ConfirmSignIn: ConfirmSignInComponent = () => {
  return <Text>ConfirmSignIn</Text>;
};

ConfirmSignIn.Header = function Header() {
  return <DefaultHeader>Confirm Sign In</DefaultHeader>;
};
ConfirmSignIn.Footer = function Footer() {
  return null;
};
ConfirmSignIn.FormFields = function FormFields() {
  return null;
};

ConfirmSignIn.displayName = 'ConfirmSignIn';
export default ConfirmSignIn;
