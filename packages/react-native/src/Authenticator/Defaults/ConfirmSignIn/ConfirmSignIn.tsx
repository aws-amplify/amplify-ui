import React from 'react';
import { Text } from 'react-native';

import { DefaultFooter } from '../../common/DefaultFooter';
import { DefaultHeader } from '../../common/DefaultHeader';
import { DefaultFormFields } from '../../common/DefaultFormFields';
import { DefaultConfirmSignInComponent } from '../types';

const ConfirmSignIn: DefaultConfirmSignInComponent = () => {
  return <Text>ConfirmSignIn</Text>;
};

ConfirmSignIn.Footer = DefaultFooter;
ConfirmSignIn.FormFields = DefaultFormFields;
ConfirmSignIn.Header = DefaultHeader;

ConfirmSignIn.displayName = 'ConfirmSignIn';
export default ConfirmSignIn;
