import React from 'react';
import { Text } from 'react-native';

import { ConfirmSignInComponent } from './types';
import { DefaultFooter } from '../../common/DefaultFooter';
import { DefaultHeader } from '../../common/DefaultHeader';

const ConfirmSignIn: ConfirmSignInComponent = () => {
  return <Text>ConfirmSignIn</Text>;
};

ConfirmSignIn.Header = DefaultHeader;
ConfirmSignIn.Footer = DefaultFooter;
ConfirmSignIn.FormFields = function FormFields() {
  return null;
};

ConfirmSignIn.displayName = 'ConfirmSignIn';
export default ConfirmSignIn;
