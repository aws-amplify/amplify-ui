import { TextStyle, ViewStyle } from 'react-native';

import { AuthenticatorComponentDefaults } from '@aws-amplify/ui-react-core';
import { FormHandlers } from '../../types';

export interface ResetPasswordStyle {
  container: ViewStyle;
  buttonPrimary: ViewStyle;
  buttonPrimaryText: TextStyle;
  buttonSecondary: TextStyle;
  buttonPressed: ViewStyle;
  textField: ViewStyle;
}

export type ResetPasswordComponent = AuthenticatorComponentDefaults<
  FormHandlers & { style?: ResetPasswordStyle }
>['ResetPassword'];
