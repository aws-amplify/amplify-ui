import React from 'react';
import { Text } from 'react-native';

import { DefaultFooter } from '../../common/DefaultFooter';
import { DefaultHeader } from '../../common/DefaultHeader';
import { DefaultFormFields } from '../../common/DefaultFormFields';
import { DefaultSignUpComponent } from '../types';

const SignUp: DefaultSignUpComponent = () => {
  return <Text>SignUp</Text>;
};

SignUp.Footer = DefaultFooter;
SignUp.FormFields = DefaultFormFields;
SignUp.Header = DefaultHeader;

SignUp.displayName = 'SignUp';
export default SignUp;
