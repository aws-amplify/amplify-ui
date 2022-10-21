import React from 'react';
import { Text } from 'react-native';

import { SignInComponent } from './types';
import { DefaultHeader } from '../../common/DefaultHeader';

const SignIn: SignInComponent = () => {
  return <Text>SignIn</Text>;
};

SignIn.Header = function Header() {
  return <DefaultHeader>Sign In</DefaultHeader>;
};
SignIn.Footer = function Footer() {
  return null;
};
SignIn.FormFields = function FormFields() {
  return null;
};

SignIn.displayName = 'SignIn';
export default SignIn;
