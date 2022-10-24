import React from 'react';
import { Text } from 'react-native';

import { ConfirmVerifyUserComponent } from './types';
import { DefaultFooter } from '../../common/DefaultFooter';
import { DefaultHeader } from '../../common/DefaultHeader';

const ConfirmVerifyUser: ConfirmVerifyUserComponent = () => {
  return <Text>ConfirmVerifyUser</Text>;
};

ConfirmVerifyUser.Header = DefaultHeader;
ConfirmVerifyUser.Footer = DefaultFooter;
ConfirmVerifyUser.FormFields = function FormFields() {
  return null;
};

ConfirmVerifyUser.displayName = 'ConfirmVerifyUser';
export default ConfirmVerifyUser;
