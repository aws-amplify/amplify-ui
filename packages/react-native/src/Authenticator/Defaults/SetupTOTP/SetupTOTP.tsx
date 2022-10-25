import React from 'react';
import { Text } from 'react-native';

import { DefaultFooter } from '../../common/DefaultFooter';
import { DefaultHeader } from '../../common/DefaultHeader';
import { DefaultFormFields } from '../FormFields';
import { DefaultSetupTOTPComponent } from '../types';

const SetupTOTP: DefaultSetupTOTPComponent = () => {
  return <Text>SetupTOTP</Text>;
};

SetupTOTP.FormFields = DefaultFormFields;
SetupTOTP.Footer = DefaultFooter;
SetupTOTP.Header = DefaultHeader;

SetupTOTP.displayName = 'SetupTOTP';
export default SetupTOTP;
