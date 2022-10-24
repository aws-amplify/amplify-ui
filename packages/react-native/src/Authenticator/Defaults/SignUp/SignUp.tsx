import React from 'react';
import { Text } from 'react-native';

import { SignUpComponent } from './types';
import { DefaultFooter } from '../../common/DefaultFooter';
import { DefaultHeader } from '../../common/DefaultHeader';

const SignUp: SignUpComponent = () => {
  return <Text>SignUp</Text>;
};

SignUp.Header = DefaultHeader;
SignUp.Footer = DefaultFooter;
SignUp.FormFields = function FormFields() {
  return null;
};

SignUp.displayName = 'SignUp';
export default SignUp;
