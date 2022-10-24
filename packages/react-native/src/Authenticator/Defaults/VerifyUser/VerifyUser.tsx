import React from 'react';
import { Text } from 'react-native';

import { VerifyUserComponent } from './types';
import { DefaultHeader } from '../../common/DefaultHeader';

const VerifyUser: VerifyUserComponent = () => {
  return <Text>VerifyUser</Text>;
};

VerifyUser.Header = DefaultHeader;

VerifyUser.Footer = function Footer() {
  return null;
};
VerifyUser.FormFields = function FormFields() {
  return null;
};

VerifyUser.displayName = 'VerifyUser';
export default VerifyUser;
