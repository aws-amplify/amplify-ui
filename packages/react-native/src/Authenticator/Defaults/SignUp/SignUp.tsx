import React from 'react';
import { Text } from 'react-native';

import { DefaultHeader } from '../../common/DefaultHeader';
import { DefaultFormFields } from '../FormFields';
import { DefaultSignUpComponent } from '../types';

const SignUp: DefaultSignUpComponent = () => {
  return <Text>SignUp</Text>;
};

SignUp.Footer = function Footer() {
  return null;
};
SignUp.FormFields = DefaultFormFields;
SignUp.Header = DefaultHeader;

SignUp.displayName = 'SignUp';
export default SignUp;
