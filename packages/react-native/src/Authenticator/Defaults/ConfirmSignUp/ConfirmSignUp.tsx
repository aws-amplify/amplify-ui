import React from 'react';
import { Text } from 'react-native';

import { DefaultFooter } from '../../common/DefaultFooter';
import { DefaultHeader } from '../../common/DefaultHeader';
import { DefaultFormFields } from '../FormFields';
import { DefaultConfirmSignUpComponent } from '../types';

const ConfirmSignUp: DefaultConfirmSignUpComponent = () => {
  return <Text>ConfirmSignUp</Text>;
};

ConfirmSignUp.FormFields = DefaultFormFields;
ConfirmSignUp.Footer = DefaultFooter;
ConfirmSignUp.Header = DefaultHeader;

ConfirmSignUp.displayName = 'ConfirmSignUp';
export default ConfirmSignUp;
