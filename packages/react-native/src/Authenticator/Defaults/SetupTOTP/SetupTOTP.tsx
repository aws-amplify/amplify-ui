import React from 'react';
import { Text } from 'react-native';

import { SetupTOTPComponent } from './types';

const SetupTOTP: SetupTOTPComponent = () => {
  return <Text>SetupTOTP</Text>;
};

SetupTOTP.Header = function Header() {
  return null;
};
SetupTOTP.Footer = function Footer() {
  return null;
};
SetupTOTP.FormFields = function FormFields() {
  return null;
};

SetupTOTP.displayName = 'SetupTOTP';
export default SetupTOTP;
