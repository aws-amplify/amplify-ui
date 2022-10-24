import React from 'react';
import { Text } from 'react-native';

import { DefaultHeader } from '../../common/DefaultHeader';
import { DefaultVerifyUserComponent } from '../types';

const VerifyUser: DefaultVerifyUserComponent = () => {
  return <Text>VerifyUser</Text>;
};

const FormFields: DefaultVerifyUserComponent['FormFields'] = () => null;

VerifyUser.Footer = function Footer() {
  return null;
};
VerifyUser.FormFields = FormFields;
VerifyUser.Header = DefaultHeader;

VerifyUser.displayName = 'VerifyUser';
export default VerifyUser;
