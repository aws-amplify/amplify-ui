import React from 'react';
import { Text } from 'react-native';

import { DefaultHeader } from '../../common/DefaultHeader';
import { DefaultFormFields } from '../FormFields';
import { DefaultConfirmVerifyUserComponent } from '../types';

const ConfirmVerifyUser: DefaultConfirmVerifyUserComponent = () => {
  return <Text>ConfirmVerifyUser</Text>;
};

ConfirmVerifyUser.Footer = function Footer() {
  return null;
};
ConfirmVerifyUser.FormFields = DefaultFormFields;
ConfirmVerifyUser.Header = DefaultHeader;

ConfirmVerifyUser.displayName = 'ConfirmVerifyUser';
export default ConfirmVerifyUser;
