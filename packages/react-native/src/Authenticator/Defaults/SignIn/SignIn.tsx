import React from 'react';
import { Text } from 'react-native';

import { DefaultFooter } from '../../common/DefaultFooter';
import { DefaultHeader } from '../../common/DefaultHeader';
import { DefaultFormFields } from '../FormFields';
import { DefaultSignInComponent } from '../types';

const SignIn: DefaultSignInComponent = () => {
  return <Text>SignIn</Text>;
};

SignIn.Footer = DefaultFooter;
SignIn.FormFields = DefaultFormFields;
SignIn.Header = DefaultHeader;

SignIn.displayName = 'SignIn';
export default SignIn;
