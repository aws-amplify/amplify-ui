import React from 'react';
import { Text } from 'react-native';

import { ConfirmVerifyUserComponent } from './types';

const ConfirmVerifyUser: ConfirmVerifyUserComponent = () => {
  return <Text>ConfirmVerifyUser</Text>;
};

ConfirmVerifyUser.Header = function Header() {
  return null;
};
ConfirmVerifyUser.Footer = function Footer() {
  return null;
};
ConfirmVerifyUser.FormFields = function FormFields() {
  return null;
};

ConfirmVerifyUser.displayName = 'ConfirmVerifyUser';
export default ConfirmVerifyUser;
