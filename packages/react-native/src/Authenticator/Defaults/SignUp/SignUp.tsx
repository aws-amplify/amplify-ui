import React from 'react';
import { Text } from 'react-native';

import { SignUpComponent } from './types';
import { DefaultHeader } from '../../common/DefaultHeader';

const SignUp: SignUpComponent = () => {
  return <Text>SignUp</Text>;
};

SignUp.Header = function Header() {
  return <DefaultHeader>Sign Up</DefaultHeader>;
};
SignUp.Footer = function Footer() {
  return null;
};
SignUp.FormFields = function FormFields() {
  return null;
};

SignUp.displayName = 'SignUp';
export default SignUp;
