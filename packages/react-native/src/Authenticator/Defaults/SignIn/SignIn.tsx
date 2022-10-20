import React from 'react';
import { Text } from 'react-native';

import { SignInComponent } from './types';

const SignIn: SignInComponent = () => {
  return <Text>SignIn</Text>;
};

SignIn.Header = function Header() {
  return null;
};
SignIn.Footer = function Footer() {
  return null;
};
SignIn.FormFields = function FormFields() {
  return null;
};

SignIn.displayName = 'SignIn';
export default SignIn;
