import { TextStyle, ViewStyle } from 'react-native';

import { AuthenticatorComponentDefaults } from '@aws-amplify/ui-react-core';
import { FormHandlers } from '../../types';

export interface ConfirmResetPasswordStyle {
  container: ViewStyle;
  buttonPrimary: ViewStyle;
  buttonPrimaryText: TextStyle;
  buttonPressed: ViewStyle;
  buttonSecondary: ViewStyle;
  errorMessage: ViewStyle;
  field: ViewStyle;
}

export type ConfirmResetPasswordComponent = AuthenticatorComponentDefaults<
  FormHandlers & { style?: ConfirmResetPasswordStyle }
>['ConfirmResetPassword'];
