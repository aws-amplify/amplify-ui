import React from 'react';
import { Text } from 'react-native';

import { SignUpComponent } from './types';

const SignUp: SignUpComponent = () => {
  return <Text>SignUp</Text>;
};

SignUp.Header = function Header() {
  return null;
};
SignUp.Footer = function Footer() {
  return null;
};
SignUp.FormFields = function FormFields() {
  return null;
};

SignUp.displayName = 'SignUp';
export default SignUp;
