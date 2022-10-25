import React from 'react';
import { Text } from 'react-native';

import { ConfirmSignUpComponent } from './types';
import { DefaultFooter } from '../../common/DefaultFooter';
import { DefaultHeader } from '../../common/DefaultHeader';

const ConfirmSignUp: ConfirmSignUpComponent = () => {
  return <Text>ConfirmSignUp</Text>;
};

ConfirmSignUp.Header = DefaultHeader;
ConfirmSignUp.Footer = DefaultFooter;
ConfirmSignUp.FormFields = function FormFields() {
  return null;
};

ConfirmSignUp.displayName = 'ConfirmSignUp';
export default ConfirmSignUp;
