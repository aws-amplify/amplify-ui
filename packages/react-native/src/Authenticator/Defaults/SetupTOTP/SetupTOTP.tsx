import React from 'react';
import { Text } from 'react-native';

import { DefaultHeader } from '../../common/DefaultHeader';

import { DefaultFormFields } from '../FormFields';
import { DefaultSetupTOTPComponent } from '../types';

const SetupTOTP: DefaultSetupTOTPComponent = () => {
  return <Text>SetupTOTP</Text>;
};

SetupTOTP.Footer = function Footer() {
  return null;
};
SetupTOTP.FormFields = DefaultFormFields;
SetupTOTP.Header = DefaultHeader;

SetupTOTP.displayName = 'SetupTOTP';
export default SetupTOTP;
