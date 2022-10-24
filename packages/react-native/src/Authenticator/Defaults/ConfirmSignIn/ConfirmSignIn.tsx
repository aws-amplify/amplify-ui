import React from 'react';
import { Text } from 'react-native';

import { DefaultHeader } from '../../common/DefaultHeader';
import { DefaultFormFields } from '../FormFields';
import { DefaultConfirmSignInComponent } from '../types';

const ConfirmSignIn: DefaultConfirmSignInComponent = () => {
  return <Text>ConfirmSignIn</Text>;
};

ConfirmSignIn.Footer = function Footer() {
  return null;
};
ConfirmSignIn.FormFields = DefaultFormFields;
ConfirmSignIn.Header = DefaultHeader;

ConfirmSignIn.displayName = 'ConfirmSignIn';
export default ConfirmSignIn;
