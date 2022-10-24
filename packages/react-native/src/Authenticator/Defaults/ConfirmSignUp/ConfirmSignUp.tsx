import React from 'react';
import { Text } from 'react-native';

import { DefaultHeader } from '../../common/DefaultHeader';
import { DefaultFormFields } from '../FormFields';
import { DefaultConfirmSignUpComponent } from '../types';

const ConfirmSignUp: DefaultConfirmSignUpComponent = () => {
  return <Text>ConfirmSignUp</Text>;
};

ConfirmSignUp.Footer = function Footer() {
  return null;
};
ConfirmSignUp.FormFields = DefaultFormFields;
ConfirmSignUp.Header = DefaultHeader;

ConfirmSignUp.displayName = 'ConfirmSignUp';
export default ConfirmSignUp;
