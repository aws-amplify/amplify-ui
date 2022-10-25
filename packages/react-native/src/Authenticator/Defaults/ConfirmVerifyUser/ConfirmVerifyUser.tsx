import React from 'react';
import { Text } from 'react-native';

import { DefaultFooter } from '../../common/DefaultFooter';
import { DefaultFormFields } from '../FormFields';
import { DefaultHeader } from '../../common/DefaultHeader';
import { DefaultConfirmVerifyUserComponent } from '../types';

const ConfirmVerifyUser: DefaultConfirmVerifyUserComponent = () => {
  return <Text>ConfirmVerifyUser</Text>;
};

ConfirmVerifyUser.Footer = DefaultFooter;
ConfirmVerifyUser.FormFields = DefaultFormFields;
ConfirmVerifyUser.Header = DefaultHeader;

ConfirmVerifyUser.displayName = 'ConfirmVerifyUser';
export default ConfirmVerifyUser;
