import React from 'react';
import { Text } from 'react-native';

import { SetupTOTPComponent } from './types';
import { DefaultHeader } from '../../common/DefaultHeader';

const SetupTOTP: SetupTOTPComponent = () => {
  return <Text>SetupTOTP</Text>;
};

SetupTOTP.Header = DefaultHeader;

SetupTOTP.Footer = function Footer() {
  return null;
};
SetupTOTP.FormFields = function FormFields() {
  return null;
};

SetupTOTP.displayName = 'SetupTOTP';
export default SetupTOTP;
